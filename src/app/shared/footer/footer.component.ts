import {Component, OnInit} from '@angular/core';
import {AppConfig} from "../../conf";
import {FeedbackStyleService} from "../../services/feedback-style.service";
import {SurveyFeedbackStyleEnum} from "../../classes/survey-feedback-style.enum";
import {forkJoin} from "rxjs/index";
import {map} from "rxjs/internal/operators";

@Component({
  selector: 'i24-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  readonly imageSrc: string = "https://intake24.co.uk/assets/images/nu_logo.png";
  readonly privacyUrl: string = AppConfig.privacyUrl;
  readonly termsUrl: string = AppConfig.termsUrl;
  readonly year: number = new Date().getFullYear();
  readonly uniUrl: string = "https://openlab.ncl.ac.uk/";

  feedbackStyle: SurveyFeedbackStyleEnum;
  originalFeedbackStyle: SurveyFeedbackStyleEnum;

  constructor(private styleService: FeedbackStyleService) {
  }

  ngOnInit() {
    forkJoin(
      this.styleService.getOriginalFeedbackStyle(AppConfig.surveyId).pipe(map(st => this.originalFeedbackStyle = st)),
      this.styleService.getFeedbackStyle(AppConfig.surveyId).pipe(map(st => this.feedbackStyle = st))
    ).subscribe();
  }

  get partyModeIsVisible(): boolean {
    return this.feedbackStyle != SurveyFeedbackStyleEnum.Playful;
  }

  get backToDefaultModeIsVisible(): boolean {
    return this.feedbackStyle != SurveyFeedbackStyleEnum.Default &&
      this.originalFeedbackStyle == SurveyFeedbackStyleEnum.Default;
  }

  setStyle(event: MouseEvent, style: SurveyFeedbackStyleEnum) {
    event.preventDefault();
    this.styleService.setFeedbackStyle(style);
  }

}
