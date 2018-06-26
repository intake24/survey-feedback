import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AppAuthHttp} from "./app-http.service";
import {FiveADayFeedback} from "../classes/five-a-day-feedback";
import {ApiEndpoints} from "../api-endpoints";
import {map} from "rxjs/internal/operators";


@Injectable()
export class FoodGroupsFeedbackService {

  constructor(private httpService: AppAuthHttp) {
  }

  getFiveADayFeedback(): Observable<FiveADayFeedback> {
    return this.httpService
      .get(ApiEndpoints.fiveADayFeedback())
      .pipe(
        map(res => FiveADayFeedback.fromJson(res.json()))
      )
  }
}
