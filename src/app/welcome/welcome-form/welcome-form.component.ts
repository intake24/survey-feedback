import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {CharacterTypeEnum, CharacterSentimentEnum} from "../../classes/character.class";
import {UserInfo} from "../../classes/user-info.class";
import {none, some, Option} from "ts-option";
import {DemographicSexEnum} from "../../classes/demographic-group.class";

@Component({
  selector: 'i24-welcome-form',
  templateUrl: 'welcome-form.component.html',
  styleUrls: ['welcome-form.component.scss']
})
export class WelcomeFormComponent implements OnInit {

  @Input() userInfo: Option<UserInfo>;
  @Output() onSaved: EventEmitter<UserInfo> = new EventEmitter();

  name: string;
  sex: DemographicSexEnum;
  sexOptions = [new SexOption(DemographicSexEnum.FEMALE, "Female"), new SexOption(DemographicSexEnum.MALE, "Male")];
  yearOfBirth: string;
  weight: string;
  height: string;

  yearsOptions: number[];
  private minYearOption: number = 1899;

  characterType: CharacterTypeEnum = CharacterTypeEnum.STRAWBERRY;
  characterSentiment: CharacterSentimentEnum = CharacterSentimentEnum.EXCITING;

  constructor() {
    this.setYearsOptions();
  }

  ngOnInit() {
    this.setFieldsFromInput();
  }

  save(): void {
    this.onSaved.emit(new UserInfo(
      none,
      some(this.name),
      some(this.sex),
      some(this.stringToNumeric(this.yearOfBirth)),
      some(this.stringToNumeric(this.weight)),
      some(this.stringToNumeric(this.height)),
      none
    ));
  }

  getFormIsValid(): boolean {
    return this.name.trim() != "" &&
      this.sex &&
      this.yearOfBirthIsValid() &&
      this.isNumeric(this.weight) &&
      this.isNumeric(this.height);
  }

  private setYearsOptions(): void {
    let years = [];
    let year = (new Date()).getFullYear();
    for (let i = this.minYearOption; i <= year; i++) {
      years.push(i);
    }
    years.sort((a, b) => b - a);
    this.yearsOptions = years;
  }

  private setFieldsFromInput(): void {
    this.userInfo.match({
      some: ui => {
        this.name = ui.firstName.getOrElse(() => "");
        this.sex = ui.sex.getOrElse(() => null);
        this.yearOfBirth = this.getOptionalNumericAsString(ui.yearOfBirth);
        this.weight = this.getOptionalNumericAsString(ui.weight);
        this.height = this.getOptionalNumericAsString(ui.height);
      },
      none: () => {
        this.name = "";
        this.yearOfBirth = "";
      }
    })
  }

  private isNumeric(num): boolean {
    let n = num.replace(",",".");
    return !isNaN(parseFloat(n)) && isFinite(n);
  }


  private yearOfBirthIsValid(): boolean {
    return this.stringToNumeric(this.yearOfBirth) > 0 && this.stringToNumeric(this.yearOfBirth) < 3000;
  }

  private stringToNumeric(num): number {
    return parseFloat(num.replace(",","."));
  }

  private getOptionalNumericAsString(opt: Option<number>, def?: string): string {
    return opt.match({
      some: num => num.toString(),
      none: () => def != null ? def : ""
    });
  }

}

class SexOption {
  value: DemographicSexEnum;
  text: string;

  constructor(value: DemographicSexEnum, text: string) {
    this.value = value;
    this.text = text;
  }
}
