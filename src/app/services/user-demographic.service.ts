import {Injectable} from "@angular/core";
import {AppHttp} from "./app-http.service";
import {Observable} from "rxjs";
import {ApiEndpoints} from "../api-endpoints";
import {HenryCoefficientsCalculator} from "../classes/henry-coefficient.class";
import {Option, none, some} from "ts-option";
import {UserInfoService} from "./user-info.service";
import {UserDemographic} from "../classes/user-demographic.class";
import {PhysicalActivityLevelsService} from "./physical-activity-levels.service";
import {UserInfo} from "../classes/user-info.class";
import {PhysicalActivityLevel} from "../classes/physical-activity-level.class";

@Injectable()
export class UserDemographicService {

  constructor(private httpService: AppHttp,
              private userInfoService: UserInfoService,
              private palService: PhysicalActivityLevelsService) {
  }

  private getBmrCalculator(): Observable<HenryCoefficientsCalculator> {
    return this.httpService.get(ApiEndpoints.henryCoefficients()).map(res => {
      return HenryCoefficientsCalculator.fromJson(res.json());
    });
  }

  getUserDemographic(): Observable<Option<UserDemographic>> {
    return this.userInfoService.getMyInfo()
      .flatMap(ui =>
        Observable.forkJoin(
          this.palService.list(),
          this.getBmrCalculator()
        ).map(res => this.userInfoToUserDemographic(ui, res[0], res[1])))
      .catch(_ => Observable.of(none));
  }

  private userInfoToUserDemographic(userInfo: UserInfo,
                                    physicalActivityLevels: PhysicalActivityLevel[],
                                    hc: HenryCoefficientsCalculator): Option<UserDemographic> {
    if (userInfo.name.isEmpty ||
      userInfo.sex.isEmpty ||
      userInfo.birthdate.isEmpty ||
      userInfo.weight.isEmpty ||
      userInfo.height.isEmpty ||
      userInfo.physicalActivityLevelId.isEmpty) {
      return none;
    } else {
      let pals = physicalActivityLevels.filter(pal => pal.id == userInfo.physicalActivityLevelId.get);
      if (!pals.length) {
        throw "Unknown physical activity level Id."
      }
      return some(new UserDemographic(userInfo.name.get, userInfo.sex.get,
        userInfo.birthdate.get.getFullYear(),
        (new Date()).getFullYear() - userInfo.birthdate.get.getFullYear(),
        userInfo.height.get, userInfo.weight.get, pals[0], hc));
    }
  }

}
