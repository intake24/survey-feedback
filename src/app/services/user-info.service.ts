import {Injectable} from '@angular/core';
import {AppHttp} from "./app-http.service";
import {Observable} from "rxjs";
import {UserInfo} from "../classes/user-info.class";
import {ApiEndpoints} from "../api-endpoints";

@Injectable()
export class UserInfoService {

  constructor(private httpService: AppHttp) {
  }

  getMyInfo(): Observable<UserInfo> {
    return this.httpService.get(ApiEndpoints.myUserInfo())
      .map(res => UserInfo.fromJson(res.json()));
  }

  updateMyInfo(userInfo: UserInfo): Observable<UserInfo> {
    return this.httpService.post(ApiEndpoints.myUserInfo(), userInfo.toJsonRequest())
      .map(res => UserInfo.fromJson(res.json()));

  }

}
