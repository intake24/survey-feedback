import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AppHttp} from "./app-http.service";
import {UserStateService} from "./user-state.service";
import {Food, SurveySubmission} from "../classes/food.class";
import {ApiEndpoints} from "../api-endpoints";
import {FlattenArray} from "../utils/flatten-array";


@Injectable()
export class MySurveyResultsService {

  constructor(private httpService: AppHttp, private userService: UserStateService) {
  }

  list(): Observable<SurveySubmission[]> {
    return this.userService.getSurveyId().match({
      some: id => this.httpService
        .get(ApiEndpoints.mySurveyResults(id))
        .map(res => {
          return res.json().map(jsonSub => SurveySubmission.fromJson(jsonSub));
        }),
      none: () => Observable.empty<SurveySubmission[]>()
    })
  }

}
