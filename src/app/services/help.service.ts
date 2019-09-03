import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AppAuthHttp} from './app-http.service';
import {ApiEndpoints} from '../api-endpoints';
import {FeedbackMessage} from '../classes/feedback-message.class';
import {Response} from '@angular/http';


@Injectable()
export class HelpService {

  constructor(private httpService: AppAuthHttp) {
  }

  sendFeedback(feedbackMessage: FeedbackMessage): Observable<Response> {
    return this.httpService.post(ApiEndpoints.helpFeedback(), this.feedbackMessageToJson(feedbackMessage));
  }

  private feedbackMessageToJson(feedbackMessage: FeedbackMessage): any {
    return JSON.stringify(feedbackMessage);
  }

}
