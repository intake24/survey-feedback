import {Injectable} from "@angular/core";
import {AppHttp} from "./app-http.service";
import {Observable} from "rxjs";
import {ApiEndpoints} from "../api-endpoints";
import {HenryCoefficientsCalculator} from "../classes/henry-coefficient.class";
import {Option, none, some} from "ts-option";
import {UserDemographic, DemographicSexEnum} from "../classes/demographic-group.class";

@Injectable()
export class UserDemographicService {

  private henryCoefficientsCalculator: Option<HenryCoefficientsCalculator> = none;

  constructor(private httpService: AppHttp) {
  }

  get(): Observable<HenryCoefficientsCalculator> {
    return this.httpService
      .get(ApiEndpoints.henryCoefficients())
      .map(res => {
        return HenryCoefficientsCalculator.fromJson(res.json());
      });
  }

  getUserDemographic(): Observable<UserDemographic> {
    return this.henryCoefficientsCalculator.match({
      some: hc => Observable.create(new UserDemographic("Super Tim", DemographicSexEnum.MALE, 28, 1.78, 78, hc)),
      none: () => this.get().map(hc => {
        this.henryCoefficientsCalculator = some(hc);
        return new UserDemographic("Super Tim", DemographicSexEnum.MALE, 28, 1.78, 78, hc);
      })
    });
  }

}
