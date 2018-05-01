import {Injectable} from "@angular/core";
import {AppAuthHttp} from "./app-http.service";
import {forkJoin, Observable, of} from "rxjs";
import {ApiEndpoints} from "../api-endpoints";
import {HenryCoefficientsCalculator} from "../classes/henry-coefficient.class";
import {none, Option, some} from "ts-option";
import {UserInfoService} from "./user-info.service";
import {UserDemographic} from "../classes/user-demographic.class";
import {PhysicalActivityLevelsService} from "./physical-activity-levels.service";
import {UserInfo} from "../classes/user-info.class";
import {PhysicalActivityLevel} from "../classes/physical-activity-level.class";
import {WeightTarget, WeightTargetsService} from "./weight-targets.service";
import {catchError, map, mergeMap} from "rxjs/internal/operators";

@Injectable()
export class UserDemographicService {

  constructor(private httpService: AppAuthHttp,
              private userInfoService: UserInfoService,
              private palService: PhysicalActivityLevelsService,
              private weightTargetsService: WeightTargetsService) {
  }

  private getBmrCalculator(): Observable<HenryCoefficientsCalculator> {
    return this.httpService.get(ApiEndpoints.henryCoefficients()).pipe(
      map(res => {
        return HenryCoefficientsCalculator.fromJson(res.json());
      })
    );
  }

  getUserDemographic(): Observable<Option<UserDemographic>> {
    return this.userInfoService.getMyInfo().pipe(
      mergeMap(ui =>
        forkJoin(
          this.palService.list(),
          this.weightTargetsService.list(),
          this.getBmrCalculator()
        ).pipe(map(res => this.userInfoToUserDemographic(ui, res[0], res[1], res[2])))),
      catchError(() => of(none))
    );
  }

  private userInfoToUserDemographic(userInfo: UserInfo,
                                    physicalActivityLevels: PhysicalActivityLevel[],
                                    weightTargets: WeightTarget[],
                                    hc: HenryCoefficientsCalculator): Option<UserDemographic> {
    if (userInfo.name.isEmpty ||
      userInfo.sex.isEmpty ||
      userInfo.birthdate.isEmpty ||
      userInfo.weight.isEmpty ||
      userInfo.weightTarget.isEmpty ||
      userInfo.height.isEmpty ||
      userInfo.physicalActivityLevelId.isEmpty) {
      return none;
    } else {
      let pals = physicalActivityLevels.filter(pal => pal.id == userInfo.physicalActivityLevelId.get);
      let wts = weightTargets.filter(wt => wt.id == userInfo.weightTarget.get);
      if (!pals.length) {
        throw "Unknown physical activity level Id."
      }
      if (!wts.length) {
        throw "Unknown weight target."
      }
      return some(new UserDemographic(userInfo.name.get, userInfo.sex.get,
        userInfo.birthdate.get.getFullYear(),
        (new Date()).getFullYear() - userInfo.birthdate.get.getFullYear(),
        userInfo.height.get, userInfo.weight.get, wts[0], pals[0], hc));
    }
  }

}
