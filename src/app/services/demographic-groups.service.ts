import {Injectable} from "@angular/core";
import {AppHttp} from "./app-http.service";
import {Observable} from "rxjs";
import {DemographicGroup} from "../classes/demographic-group.class";
import {ApiEndpoints} from "../api-endpoints";

@Injectable()
export class DemographicGroupsService {

  constructor(private httpService: AppHttp) {
  }

  list(): Observable<DemographicGroup[]> {
    return this.httpService
      .get(ApiEndpoints.demographicGroups())
      .map(res => {
        return res.json().map(DemographicGroup.fromJson);
      });
  }

}
