import {Component, OnInit} from '@angular/core';
import {SurveyFeedbackStyleEnum} from "./classes/survey-feedback-style.enum";
import {AppConfig} from "./conf";
import {FeedbackStyleService} from "./services/feedback-style.service";

@Component({
  selector: 'i24-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  feedbackStyle: SurveyFeedbackStyleEnum;
  isLoading: boolean = true;

  constructor(private styleService: FeedbackStyleService) {
  }

  ngOnInit() {
    this.styleService.getFeedbackStyle(AppConfig.surveyId).finally(() => {
      this.isLoading = false;
    }).map(st => {
      this.feedbackStyle = st
    }).subscribe();
  }

}
