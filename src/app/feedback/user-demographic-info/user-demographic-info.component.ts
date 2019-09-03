import {Component, Input} from '@angular/core';
import {AppConfig} from '../../conf';
import {UserDemographic} from '../../classes/user-demographic.class';
import {SurveyFeedbackStyleEnum} from '../../classes/survey-feedback-style.enum';
import {AnimateActionEnum} from '../../../animate-ts/animate-action.enum';

@Component({
  selector: 'user-demographic-info',
  templateUrl: './user-demographic-info.component.html',
  styleUrls: ['./user-demographic-info.component.scss']
})

export class UserDemographicInfoComponent {

  readonly animation = AnimateActionEnum.BounceInDown;
  readonly surveyPath: string = AppConfig.surveyPath;

  @Input() feedbackStyle: SurveyFeedbackStyleEnum;
  @Input() userDemographic: UserDemographic;
  @Input() daysRecorded: number;

  constructor() {
  }

  get userIconIsVisible(): boolean {
    return this.feedbackStyle == SurveyFeedbackStyleEnum.Playful;
  }

}
