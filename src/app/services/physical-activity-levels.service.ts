import {Injectable} from "@angular/core";
import {AppAuthHttp} from "./app-http.service";
import {Observable} from "rxjs";
import {ApiEndpoints} from "../api-endpoints";
import {PhysicalActivityLevel} from "../classes/physical-activity-level.class";

@Injectable()
export class PhysicalActivityLevelsService {

  constructor(private httpService: AppAuthHttp) {
  }

  list(): Observable<PhysicalActivityLevel[]> {
    return this.httpService
      .get(ApiEndpoints.physicalActivityLevels())
      .map(res => res.json().map(this.jsonToPhysicalActivityLevel));
  }

  private jsonToPhysicalActivityLevel(json: any): PhysicalActivityLevel {
    return new PhysicalActivityLevel(json.id, json.name, json.coefficient);
  }

}
