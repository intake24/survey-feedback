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
    return this.getRequestOptions(options, requestMethod, body).flatMap(reqOptions => {
      return this.http.request(url, reqOptions).catch(err => {
        return this.handleError(err, url, reqOptions);
      });
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

  private handleError(err: Response, url: string | Request, reqOptions: RequestOptionsArgs): any {
    if (err.status != 401) {
      return Observable.throw(err);
    } else {
      let subject = new Subject();
      this.toBeReplayed.push(new ReplayableRequest(url, reqOptions, subject));
      if (this.toBeReplayed.length <= 1) {
        this.userService.refreshAccessToken().subscribe(_ => this.replayRequests());
      }
      return subject;
    }
  }

  private replayRequests(): void {
    this.toBeReplayed.map(r =>
      this.getRequestOptions(r.reqOptions)
        .flatMap(reqOptions => this.http.request(r.url, reqOptions))
        .finally(() => r.subject.complete())
        .subscribe(
          response => r.subject.next(response),
          err => r.subject.error(err)
        )
    );
    this.toBeReplayed.length = 0;
  }

  private getRequestOptions(options?: RequestOptionsArgs,
                            requestMethod?: RequestMethod,
                            body?: any): Observable<RequestOptions> {
    return this.userService.getAccessToken().map(token => {
      let reqOptions = new RequestOptions(options);
      reqOptions.headers = new Headers({
        "Content-Type": "application/json",
        "X-Auth-Token": token
      });
      reqOptions.method = requestMethod;
      reqOptions.body = body;
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
