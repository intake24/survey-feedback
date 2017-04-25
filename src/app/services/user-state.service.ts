import {Injectable} from "@angular/core";
import {CookieService} from "angular2-cookie/core";
import {User} from "../classes/user.class";
import {RequestOptions, Http, Response, Headers} from "@angular/http";
import {ApiEndpoints} from "../api-endpoints";
import {Observable, ReplaySubject, BehaviorSubject} from "rxjs";
import {AppConfig} from "../conf";

@Injectable()
export class UserStateService {

  private static readonly Name = "UserStateService";

  private readonly ACCESS_TOKEN_COOKIE_NAME: string = "accessToken";
  private readonly REFRESH_TOKEN_COOKIE_NAME: string = "refreshToken";

  private accessTokenSubject: ReplaySubject<string> = new ReplaySubject();

  private authenticated: boolean;
  authenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: Http) {
  }

  setRefreshToken(token: string): void {
    this.notifyAuthSubscribers();
    localStorage.setItem(this.REFRESH_TOKEN_COOKIE_NAME, token);
  }

  getAccessToken(): Observable<string> {
    this.notifyAuthSubscribers();
    let accToken = localStorage.getItem(this.ACCESS_TOKEN_COOKIE_NAME);
    if (accToken != null) {
      return Observable.of(accToken);
    } else {
      if (this.accessTokenSubject.observers.length == 0) {
        this.refreshAccessToken().subscribe();
      }
      return this.accessTokenSubject.asObservable();
    }
  }

  getSurveyId(): Observable<string> {
    return this.getCredentialsFromToken().map(uc => uc.surveyId);
  }

  refreshAccessToken(): Observable<Response> {
    this.dropAccessToken();
    return this.getRefreshToken().flatMap(token => {
      let reqOptions = new RequestOptions();
      reqOptions.headers = new Headers({
        "X-Auth-Token": token
      });
      return this.http.post(ApiEndpoints.refreshUserToken(), {}, reqOptions)
        .map(res => {
          this.setAccessToken(res.json().accessToken);
          return res;
        }).catch(err => {
          location.pathname = AppConfig.surveyPath;
          this.notifyAuthSubscribers();
          return Observable.throw(err);
        });
    });
  }

  loginWithToken(token: string): Observable<Response> {
    return this.http.post(ApiEndpoints.loginWithToken(token), {})
      .map(res => {
        this.setRefreshToken(res.json().refreshToken);
        return res;
      })
  }

  private dropAccessToken(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_COOKIE_NAME);
  }

  private setAccessToken(token: string): void {
    this.notifyAuthSubscribers();
    this.accessTokenSubject.next(token);
    this.accessTokenSubject.complete();
    localStorage.setItem(this.ACCESS_TOKEN_COOKIE_NAME, token);
  }

  private getRefreshToken(): Observable<string> {
    let token = localStorage.getItem(this.REFRESH_TOKEN_COOKIE_NAME);
    if (token == null) {
      location.pathname = AppConfig.surveyPath;
    } else {
      this.notifyAuthSubscribers();
      return Observable.of(token);
    }
  }

  private getCredentialsFromToken(): Observable<User> {
    return this.getAccessToken().map(accToken => this.accTokenToUser(accToken));
  }

  private notifyAuthSubscribers(): void {
    let refreshToken = localStorage.getItem(this.REFRESH_TOKEN_COOKIE_NAME);
    let accessToken = localStorage.getItem(this.ACCESS_TOKEN_COOKIE_NAME);
    let auth = refreshToken != null && accessToken != null;
    if (auth != this.authenticated) {
      this.authenticatedSubject.next(auth);
    }
  }

  private accTokenToUser(accToken: string): User {
    let tokenPart = accToken.split(".")[1],
      parsedToken = JSON.parse(atob(tokenPart)),
      credentials = JSON.parse(atob(parsedToken.sub)),
      providerParts = credentials.providerKey.split("#");
    console.log(parsedToken, credentials, providerParts);
    if (providerParts.length < 2) {
      throw "Access token format changed. Could not retrieve surveyId and userName";
    }
    return new User(providerParts[1], providerParts[0], parsedToken.roles);
  }

}
