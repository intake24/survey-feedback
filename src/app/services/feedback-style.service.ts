import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {SurveyFeedbackStyleEnum} from "../classes/survey-feedback-style.enum";
import {ApiEndpoints} from "../api-endpoints";
import {Http} from "@angular/http";
import {map} from "rxjs/internal/operators";


const LOCAL_STORAGE_PARAM = "feedbackStyle";


@Injectable()
export class FeedbackStyleService {

  private originalStyle: SurveyFeedbackStyleEnum;
  private forcedStyle: SurveyFeedbackStyleEnum;

  constructor(private httpService: Http) {
    this.forcedStyle = SurveyFeedbackStyleEnum[localStorage.getItem(LOCAL_STORAGE_PARAM)];
  }

  getOriginalFeedbackStyle(surveyId: string): Observable<SurveyFeedbackStyleEnum> {
    if (this.originalStyle) {
      return of(this.originalStyle);
    } else {
      return this.httpService.get(ApiEndpoints.surveyFeedbackStyle(surveyId))
        .pipe(
          map(res => {
            let st = <SurveyFeedbackStyleEnum>res.json().feedbackStyle;
            this.originalStyle = st;
            return st;
          })
        );
    }
  }

  getFeedbackStyle(surveyId: string): Observable<SurveyFeedbackStyleEnum> {
    if (this.forcedStyle) {
      return of(this.forcedStyle);
    } else {
      return this.getOriginalFeedbackStyle(surveyId);
    }
  }

  setFeedbackStyle(feedbackStyle: SurveyFeedbackStyleEnum) {
    this.forcedStyle = feedbackStyle;
    localStorage.setItem(LOCAL_STORAGE_PARAM, SurveyFeedbackStyleEnum[feedbackStyle]);
    window.location.reload();
  }

}
