import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AppHttp} from "./app-http.service";
import {UserStateService} from "./user-state.service";
import {SurveyResult} from "../classes/survey-result.class";
import {ApiEndpoints} from "../api-endpoints";
import {AppConfig} from "../conf";


@Injectable()
export class MySurveyResultsService {

  constructor(private httpService: AppHttp, private userService: UserStateService) {
  }

  getSurveyResult(): Observable<SurveyResult> {
    return this.httpService
      .get(ApiEndpoints.mySurveyResults(AppConfig.surveyId))
      .map(res => {
        let surveyResult = SurveyResult.fromJson(res.json());
        if (surveyResult.surveySubmissions.length == 0) {
          location.pathname = AppConfig.surveyPath;
        }
        return surveyResult;
      });
  }

}
