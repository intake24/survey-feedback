import {Injectable} from "@angular/core";
import {
  Http, RequestOptions, Request, RequestOptionsArgs,
  Response, Headers, RequestMethod
} from "@angular/http";
import {Observable, Subject} from "rxjs";
import {UserStateService} from "./user-state.service";

@Injectable()
export class AppHttp {

  private toBeReplayed: ReplayableRequest[];

  constructor(private http: Http, private userService: UserStateService) {
    this.toBeReplayed = [];
  }

  private doRequest(url: string | Request,
                    options?: RequestOptionsArgs,
                    requestMethod?: RequestMethod,
                    body?: any): Observable<Response> {
    if (options) {
      options.method = requestMethod;
      options.body = body;
    }
    return this.getRequestOptions(options).flatMap(reqOptions => {
        return this.http.request(url, reqOptions).catch(err => {
          return this.handleError(err, url, reqOptions);
        })

    });
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return this.doRequest(url, options);
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.doRequest(url, options, RequestMethod.Post, body);
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.doRequest(url, options, RequestMethod.Get);
  }

  put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.doRequest(url, options, RequestMethod.Put, body);
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.doRequest(url, options, RequestMethod.Delete);
  }

  patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.doRequest(url, options, RequestMethod.Patch, body);
  }

  head(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.doRequest(url, options, RequestMethod.Head);
  }

  options(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.doRequest(url, options, RequestMethod.Options);
  }

  private handleError(error: Response, url: string | Request, reqOptions: RequestOptionsArgs): Observable<Response> {
    if (error.status != 401) {
      return Observable.throw(error);
    } else {
      let subject = new Subject();
      this.toBeReplayed.push(new ReplayableRequest(url, reqOptions, subject));
      this.userService.refreshAccessToken().subscribe(_ => this.replayRequests());
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

  private getRequestOptions(options?: RequestOptionsArgs): Observable<RequestOptions> {
    return this.userService.getAccessToken().map(token => {
      let reqOptions = new RequestOptions(options);
      reqOptions.headers = new Headers({
        "Content-Type": "application/json",
        "X-Auth-Token": token
      });
      return reqOptions;
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
