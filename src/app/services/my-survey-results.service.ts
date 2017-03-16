import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AppHttp} from "./app-http.service";
import {UserStateService} from "./user-state.service";
import {Food} from "../classes/food.class";
import {ApiEndpoints} from "../api-endpoints";
import {FlattenArray} from "../utils/flatten-array";


@Injectable()
export class MySurveyResultsService {

    constructor(private httpService: AppHttp, private userService: UserStateService) {
    }

    list(): Observable<Food[]> {
        return this.userService.getSurveyId().match({
            some: id => this.httpService
                .get(ApiEndpoints.mySurveyResults(id))
                .map(res => {
                    return FlattenArray.flatten(FlattenArray.flatten<any>(res.json().map(jsonSub => {
                        return jsonSub.meals;
                    })).map(jsonMeal => {
                        return jsonMeal.foods;
                    })).map(Food.fromJson);
                }),
            none: () => Observable.empty<Food[]>()
        })
    }

}
