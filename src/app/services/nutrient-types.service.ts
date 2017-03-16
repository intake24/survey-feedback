import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AppHttp} from "./app-http.service";
import {NutrientType} from "../classes/nutrient-types.class";
import {ApiEndpoints} from "../api-endpoints";

@Injectable()
export class NutrientTypesService {

    constructor(private httpService: AppHttp) {
    }

    list(): Observable<NutrientType[]> {
        return this.httpService
            .get(ApiEndpoints.nutrientTypes())
            .map(res => {
                return res.json().map(NutrientType.fromJson);
            });
    }

}
