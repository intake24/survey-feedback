import {Injectable} from "@angular/core";
import {AppAuthHttp} from "./app-http.service";
import {forkJoin, Observable} from "rxjs";
import {UserInfo} from "../classes/user-info.class";
import {ApiEndpoints} from "../api-endpoints";
import {OptionToRequest} from "../utils/option-to-request";
import {map} from "rxjs/internal/operators";

@Injectable()
export class UserInfoService {

  constructor(private httpService: AppAuthHttp) {
  }

  getMyInfo(): Observable<UserInfo> {
    return this.httpService.get(ApiEndpoints.myPhysicalData()).pipe(
      map(res => UserInfo.fromJson(res.json()))
    );
  }

  updateMyInfo(userInfo: UserInfo): Observable<UserInfo> {
    return forkJoin(
      this.httpService.patch(ApiEndpoints.myProfile(), this.userInfoToUserProfileRequest(userInfo)),
      this.httpService.patch(ApiEndpoints.myPhysicalData(), this.userInfoToPhysicalDataRequest(userInfo)),
    ).pipe(map(() => userInfo));
  }

  private userInfoToUserProfileRequest(userInfo: UserInfo): any {
    return {
      name: [],
      email: OptionToRequest.toRequest(userInfo.email),
      emailNotifications: userInfo.emailNotifications,
      phone: OptionToRequest.toRequest(userInfo.phone),
      smsNotifications: userInfo.smsNotifications
    };
  }

  private userInfoToPhysicalDataRequest(userInfo: UserInfo): any {
    return {
      sex: OptionToRequest.toRequest(userInfo.sex),
      birthdate: userInfo.birthdate.match({
        some: d => [d.toISOString().replace(/T.*/, "")],
        none: () => []
      }),
      weight: OptionToRequest.toRequest(userInfo.weight),
      weightTarget: OptionToRequest.toRequest(userInfo.weightTarget),
      height: OptionToRequest.toRequest(userInfo.height),
      physicalActivityLevelId: OptionToRequest.toRequest(userInfo.physicalActivityLevelId)
    }
  }

}
