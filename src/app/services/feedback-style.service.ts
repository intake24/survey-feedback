import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AppHttp} from "./app-http.service";
import {UserStateService} from "./user-state.service";
import {SurveyFeedbackStyleEnum} from "../classes/survey-feedback-style.enum";
import {ApiEndpoints} from "../api-endpoints";


const LOCAL_STORAGE_PARAM = "feedbackStyle";


@Injectable()
export class FeedbackStyleService {

  private originalStyle: SurveyFeedbackStyleEnum;
  private forcedStyle: SurveyFeedbackStyleEnum;

  constructor(private httpService: AppHttp) {
    this.forcedStyle = SurveyFeedbackStyleEnum[localStorage.getItem(LOCAL_STORAGE_PARAM)];
  }

  getOriginalFeedbackStyle(surveyId: string): Observable<SurveyFeedbackStyleEnum> {
    if (this.originalStyle) {
      return Observable.of(this.originalStyle);
    } else {
      return this.httpService.get(ApiEndpoints.surveyFeedbackStyle(surveyId))
        .map(res => {
          let st = <SurveyFeedbackStyleEnum>res.json().feedbackStyle;
          this.originalStyle = st;
          return st;
        });
    }
  }

  getFeedbackStyle(surveyId: string): Observable<SurveyFeedbackStyleEnum> {
    if (this.forcedStyle) {
      return Observable.of(this.forcedStyle);
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
