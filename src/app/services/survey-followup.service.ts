import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiEndpoints} from '../api-endpoints';
import {map} from 'rxjs/internal/operators';
import {AppAuthHttp} from './app-http.service';

@Injectable()
export class SurveyFollowUpService {

  constructor(private httpService: AppAuthHttp) {
  }
  getFollowUpUrl(surveyId: string): Observable<string | undefined> {
    return this.httpService.get(ApiEndpoints.surveyFollowUp(surveyId))
      .pipe(
        map(res => {
          const json = res.json();
          return json.followUpUrl.length ? json.followUpUrl[0] : undefined;
        })
      );
  }
}
