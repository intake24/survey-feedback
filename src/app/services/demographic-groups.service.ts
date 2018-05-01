import {Injectable} from "@angular/core";
import {AppAuthHttp} from "./app-http.service";
import {Observable} from "rxjs";
import {DemographicGroup} from "../classes/demographic-group.class";
import {ApiEndpoints} from "../api-endpoints";
import {map} from "rxjs/internal/operators";

@Injectable()
export class DemographicGroupsService {

  constructor(private httpService: AppAuthHttp) {
  }

  list(): Observable<DemographicGroup[]> {
    return this.httpService
      .get(ApiEndpoints.demographicGroups())
      .pipe(
        map(res => {
          return res.json().map(DemographicGroup.fromJson);
        })
      );
  }

}
