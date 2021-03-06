import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserStateService} from '../services/user-state.service';
import {AppConfig} from '../conf';
import {SurveysService} from '../services/surveys.service';

@Component({
  selector: 'i24-token-login',
  templateUrl: './token-login.component.html',
  styleUrls: ['./token-login.component.scss']
})
export class TokenLoginComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserStateService,
              private surveyService: SurveysService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => this.loginWithToken(params.token));
  }

  private loginWithToken(token: string): void {
    this.userService.loginWithToken(token)
      .subscribe(
        res => this.surveyService.getMySurveyResults(AppConfig.surveyId)
          .subscribe(result => {
            if (result.surveySubmissions.length == 0) {
              this.goToDefaultPage();
            } else {
              this.goToFeedback();
            }
          }),
        err => this.surveyService.getSurveyPublicInfo(AppConfig.surveyId)
          .subscribe(
            surveyInfo => surveyInfo.originatingURL.match({
              some: url => this.goToUrl(url),
              none: () => this.goToDefaultPage()
            }),
            err => console.log(err)
          )
      );
  }

  private goToDefaultPage(): void {
    console.log('Go to default page');
    this.doWithTimeout(() => {
      location.href = AppConfig.surveyPath;
    });
  }

  private goToFeedback(): void {
    console.log('Go to feedback');
    this.doWithTimeout(() => {
      this.router.navigate(['']);
    });
  }

  private goToUrl(url: string): void {
    console.log('Go to:', url);
    this.doWithTimeout(() => {
      location.href = url;
    });
  }

  private doWithTimeout = (fn) => setTimeout(fn, 2000);

}
