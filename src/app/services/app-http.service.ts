import {Injectable} from "@angular/core";
import {Http, RequestOptions, Request, RequestOptionsArgs,
    Response, Headers, RequestMethod} from "@angular/http";
import {Observable} from "rxjs";
import {UserStateService} from "./user-state.service";
import {ApiEndpoints} from "../api-endpoints";

@Injectable()
export class AppHttp {
    constructor(private http: Http, private userService: UserStateService) {
    }

    private replayableRequest(url: string | Request,
                              options: RequestOptionsArgs,
                              body?: any): Observable<Response> {
        let reqOptions = this.getRequestOptions(options);
        reqOptions.body = body;
        return this.http.request(url, reqOptions).catch(err => {
            return this.handleError(err)
                .flatMap(_ => {
                    let reqOptions = this.getRequestOptions(options);
                    return this.http.request(url, reqOptions).catch(this.handleError);
                });
        });
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        let reqOptions = this.getRequestOptions(options);
        return this.replayableRequest(url, reqOptions).catch(this.handleError);
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
        return this.replayableRequest(url, reqOptions, body).catch(this.handleError);
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        let reqOptions = this.getRequestOptions(options);
        reqOptions.method = RequestMethod.Delete;
        return this.replayableRequest(url, reqOptions).catch(this.handleError);
    }

    patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        let reqOptions = this.getRequestOptions(options);
        reqOptions.method = RequestMethod.Patch;
        return this.replayableRequest(url, reqOptions, body).catch(this.handleError);
    }

    head(url: string, options?: RequestOptionsArgs): Observable<Response> {
        let reqOptions = this.getRequestOptions(options);
        reqOptions.method = RequestMethod.Head;
        return this.replayableRequest(url, reqOptions).catch(this.handleError);
    }

    options(url: string, options?: RequestOptionsArgs): Observable<Response> {
        let reqOptions = this.getRequestOptions(options);
        reqOptions.method = RequestMethod.Options;
        return this.replayableRequest(url, reqOptions).catch(this.handleError);
    }

    private handleError(error: Response): Observable<Response> {
        if (error.status != 401) {
            return Observable.throw(error);
        } else {
            return this.refreshToken();
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
            .catch(this.handleError)
            .map(res => {
                this.userService.setAccessToken(res.json().accessToken);
                return res;
            });
    }

}