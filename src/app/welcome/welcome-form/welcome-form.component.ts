import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CharacterSentimentEnum, CharacterTypeEnum} from '../../classes/character.class';
import {UserInfo} from '../../classes/user-info.class';
import {Option, some} from 'ts-option';
import {DemographicSexEnum} from '../../classes/demographic-group.class';
import {PhysicalActivityLevel} from '../../classes/physical-activity-level.class';
import {WeightTarget} from '../../services/weight-targets.service';
import {AppConfig} from '../../conf';
import {SurveyFeedbackStyleEnum} from '../../classes/survey-feedback-style.enum';
import {WelcomeFormMessages} from './welcome-form-messages.const';

const OLDEST_PERSON_AGE = 120;
const YOUNGEST_PERSON_AGE = 1;

@Component({
  selector: 'i24-welcome-form',
  templateUrl: 'welcome-form.component.html',
  styleUrls: ['welcome-form.component.scss']
})
export class WelcomeFormComponent implements OnInit {

  @Input() userInfo: Option<UserInfo>;
  @Input() weightTargets: WeightTarget[];
  @Input() physicalActivityLevels: PhysicalActivityLevel[];
  @Input() feedbackStyle: SurveyFeedbackStyleEnum;
  @Output() onSaved: EventEmitter<UserInfo> = new EventEmitter();

  sex: DemographicSexEnum;
  sexOptions = [new SexOption('', 'Select'),
    new SexOption(DemographicSexEnum.FEMALE, 'Female'),
    new SexOption(DemographicSexEnum.MALE, 'Male')];
  yearOfBirth: string;
  weight: string;
  height: string;
  physicalActivityLevelId: number;
  weightTarget: string;
  privacyUrl: string = AppConfig.privacyUrl;
  termsUrl: string = AppConfig.termsUrl;

  yearsOptions: number[];

  characterType: CharacterTypeEnum = CharacterTypeEnum.STRAWBERRY;
  characterSentiment: CharacterSentimentEnum = CharacterSentimentEnum.EXCITING;

  content = WelcomeFormMessages;

  constructor() {
    this.setYearsOptions();
  }

  get smileyIsVisible(): boolean {
    return this.feedbackStyle == SurveyFeedbackStyleEnum.Playful;
  }

  ngOnInit() {
    this.setFieldsFromInput();
  }

  save(): void {
    this.userInfo.map(ui => {
      ui.sex = some(this.sex);
      ui.birthdate = some(new Date(`${this.yearOfBirth}-01-01`));
      ui.weight = some(this.stringToNumeric(this.weight));
      ui.height = some(this.stringToNumeric(this.height));
      ui.physicalActivityLevelId = some(this.physicalActivityLevelId);
      ui.weightTarget = some(this.weightTarget);
      this.onSaved.emit(ui);
    });
  }

  getFormIsValid(): boolean {
    return this.sex &&
      this.yearOfBirthIsValid() &&
      this.isNumeric(this.weight) &&
      this.isNumeric(this.height);
  }

  private setYearsOptions(): void {
    const years = [];
    const year = (new Date()).getFullYear();
    const minYearOption = year - OLDEST_PERSON_AGE;
    const maxYearOption = year - YOUNGEST_PERSON_AGE;
    for (let i = minYearOption; i <= maxYearOption; i++) {
      years.unshift(i);
    }
    this.yearsOptions = years;
  }

  private setFieldsFromInput(): void {
    this.userInfo.match({
      some: ui => {
        this.sex = ui.sex.getOrElse(() => null);
        this.yearOfBirth = ui.birthdate.match({
          some: d => String(d.getFullYear()),
          none: () => ''
        });
        this.weight = this.getOptionalNumericAsString(ui.weight);
        this.height = this.getOptionalNumericAsString(ui.height);
        this.physicalActivityLevelId = ui.physicalActivityLevelId.getOrElse(() => this.physicalActivityLevels[0].id);
        this.weightTarget = ui.weightTarget.getOrElse(() => this.weightTargets[0].id);
      },
      none: () => {
        this.yearOfBirth = '';
      }
    })
  }

  private isNumeric(num): boolean {
    if (num == null || num == '') {
      return false;
    }
    const n = num.replace(',', '.');
    return !isNaN(parseFloat(n)) && isFinite(n);
  }


  private yearOfBirthIsValid(): boolean {
    return this.stringToNumeric(this.yearOfBirth) > 0 && this.stringToNumeric(this.yearOfBirth) < 3000;
  }

  private stringToNumeric(num): number {
    return parseFloat(num.replace(',', '.'));
  }

  private getOptionalNumericAsString(opt: Option<number>, def?: string): string {
    return opt.match({
      some: num => num.toString(),
      none: () => def != null ? def : ''
    });
  }

}

class SexOption {
  value: DemographicSexEnum | '';
  text: string;

  constructor(value: DemographicSexEnum | '', text: string) {
    this.value = value;
    this.text = text;
  }
}
