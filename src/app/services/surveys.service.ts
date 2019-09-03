import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AppAuthHttp} from './app-http.service';
import {UserStateService} from './user-state.service';
import {SurveyStats} from '../classes/survey-result.class';
import {ApiEndpoints} from '../api-endpoints';
import {SurveyPublicParameters} from '../classes/survey-public-parameters.class';
import {map} from 'rxjs/internal/operators';


@Injectable()
export class SurveysService {

  constructor(private httpService: AppAuthHttp, private userService: UserStateService) {
  }

  getMySurveyResults(surveyId: string): Observable<SurveyStats> {
    return this.httpService
      .get(ApiEndpoints.mySurveyResults(surveyId)).pipe(
        map(res => SurveyStats.fromJson(res.json()))
      );
  }

  getSurveyPublicInfo(surveyId: string): Observable<SurveyPublicParameters> {
    return this.httpService.get(ApiEndpoints.surveyPublicParameters(surveyId)).pipe(
      map(res => SurveyPublicParameters.fromJson(res.json()))
    );
  }

}
