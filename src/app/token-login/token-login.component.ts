import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserStateService} from "../services/user-state.service";
import {AppConfig} from "../conf";
import {SurveysService} from "../services/surveys.service";

@Component({
  selector: 'i24-token-login',
  templateUrl: './token-login.component.html',
  styleUrls: ['./token-login.component.scss']
})
export class TokenLoginComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private userService: UserStateService,
              private surveyService: SurveysService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => this.loginWithToken(params.token));
  }

  private loginWithToken(token: string): void {
    this.userService.loginWithToken(token)
      .subscribe(
        res => this.goToDefaultPage(),
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
    location.pathname = AppConfig.surveyPath;
  }

  private goToUrl(url: string): void {
    location.href = url;
  }

}
