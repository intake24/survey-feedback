import {Injectable} from "@angular/core";
import {
  Http, RequestOptions, Request, RequestOptionsArgs,
  Response, Headers, RequestMethod
} from "@angular/http";
import {Observable, Subject} from "rxjs";
import {UserStateService} from "./user-state.service";
import {ApiEndpoints} from "../api-endpoints";

@Injectable()
export class AppHttp {

  private toBeReplayed: ReplayableRequest[];

  constructor(private http: Http, private userService: UserStateService) {
    this.toBeReplayed = [];
  }

  private replayableRequest(url: string | Request,
                            options: RequestOptionsArgs,
                            body?: any): Observable<Response> {
    let reqOptions = this.getRequestOptions(options);
    reqOptions.body = body;
    return this.http.request(url, reqOptions).catch(err => {
      return this.handleError(err, url, reqOptions);
    });
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    let reqOptions = this.getRequestOptions(options);
    return this.replayableRequest(url, reqOptions);
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    let reqOptions = this.getRequestOptions(options);
    reqOptions.method = RequestMethod.Post;
    return this.replayableRequest(url, reqOptions, body);
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    let reqOptions = this.getRequestOptions(options);
    reqOptions.method = RequestMethod.Get;
    return this.replayableRequest(url, reqOptions);
  }

  put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    let reqOptions = this.getRequestOptions(options);
    reqOptions.method = RequestMethod.Put;
    return this.replayableRequest(url, reqOptions, body);
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    let reqOptions = this.getRequestOptions(options);
    reqOptions.method = RequestMethod.Delete;
    return this.replayableRequest(url, reqOptions);
  }

  patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    let reqOptions = this.getRequestOptions(options);
    reqOptions.method = RequestMethod.Patch;
    return this.replayableRequest(url, reqOptions, body);
  }

  head(url: string, options?: RequestOptionsArgs): Observable<Response> {
    let reqOptions = this.getRequestOptions(options);
    reqOptions.method = RequestMethod.Head;
    return this.replayableRequest(url, reqOptions);
  }

  options(url: string, options?: RequestOptionsArgs): Observable<Response> {
    let reqOptions = this.getRequestOptions(options);
    reqOptions.method = RequestMethod.Options;
    return this.replayableRequest(url, reqOptions);
  }

  private handleError(error: Response, url: string | Request, reqOptions: RequestOptionsArgs): Observable<Response> {
    if (error.status != 401) {
      return Observable.throw(error);
    } else {
      let subject = new Subject();
      this.toBeReplayed.push(new ReplayableRequest(url, reqOptions, subject));
      this.refreshToken();
      return subject.asObservable();
    }
  }

  private replayRequests(): void {
    let r = this.toBeReplayed.shift();
    while (r) {
      this.http.request(r.url, r.reqOptions).map(response => {
        r.subject.next(response);
      }).catch(err => {
        return this.handleError(err, r.url, r.reqOptions);
      });
      r = this.toBeReplayed.shift();
    }
  }

  private getRequestOptions(options?: RequestOptionsArgs): RequestOptions {
    let reqOptions = new RequestOptions(options);
    reqOptions.headers = new Headers({
      "Content-Type": "application/json",
      "X-Auth-Token": this.userService.getAccessToken()
    });
    return reqOptions;
  }

  private refreshToken(): Observable<Response> {
    let reqOptions = new RequestOptions();
    reqOptions.headers = new Headers({
      "X-Auth-Token": this.userService.getRefreshToken()
    });
    return this.http.post(ApiEndpoints.refreshUserToken(), {}, reqOptions)
      .map(res => {
        this.userService.setAccessToken(res.json().accessToken);
        this.replayRequests();
        return res;
      });
  }

}

class ReplayableRequest {

  readonly url: string | Request;
  readonly reqOptions: RequestOptionsArgs;
  readonly subject: Subject<Response>;

  constructor(url: string | Request, reqOptions: RequestOptionsArgs, subject: Subject<Response>) {
    this.url = url;
    this.reqOptions = reqOptions;
    this.subject = subject;
  }

}
