import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AppHttp} from "./app-http.service";
import {UserStateService} from "./user-state.service";
import {SurveyResult} from "../classes/survey-result.class";
import {ApiEndpoints} from "../api-endpoints";


@Injectable()
export class MySurveyResultsService {

  constructor(private httpService: AppHttp, private userService: UserStateService) {
  }

  getSurveyResult(): Observable<SurveyResult> {
    return this.userService.getSurveyId().match({
      some: id => this.httpService
        .get(ApiEndpoints.mySurveyResults(id))
        .map(res => {
          return SurveyResult.fromJson(res.json());
        }),
      none: () => Observable.empty<SurveyResult>()
    })
  }

}
