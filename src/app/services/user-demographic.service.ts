import {Injectable} from "@angular/core";
import {AppHttp} from "./app-http.service";
import {Observable} from "rxjs";
import {ApiEndpoints} from "../api-endpoints";
import {HenryCoefficientsCalculator} from "../classes/henry-coefficient.class";
import {Option, none} from "ts-option";
import {UserInfoService} from "./user-info.service";
import {UserDemographic} from "../classes/user-demographic.class";

@Injectable()
export class UserDemographicService {

  constructor(private httpService: AppHttp, private userInfoService: UserInfoService) {
  }

  private getBmrCalculator(): Observable<HenryCoefficientsCalculator> {
    return this.httpService.get(ApiEndpoints.henryCoefficients()).map(res => {
      return HenryCoefficientsCalculator.fromJson(res.json());
    });
  }

  getUserDemographic(): Observable<Option<UserDemographic>> {
    return this.userInfoService.getMyInfo()
      .flatMap(ui =>
        this.getBmrCalculator().map(hc => UserDemographic.fromUserInfo(ui, hc)))
      .catch(_ => Observable.of(none))
  }

}
