import {Component, OnInit} from '@angular/core';
import {AnimateActionEnum} from "../../animations/animate-action.enum";
import {Location} from "@angular/common";
import {UserInfoService} from "../services/user-info.service";
import {UserInfo} from "../classes/user-info.class";
import {Option, some, none} from "ts-option";
import {Router} from "@angular/router";
import {AppConfig} from "../conf";
import {SurveysService} from "../services/surveys.service";
import {Observable} from "rxjs";
import {SurveyResult} from "../classes/survey-result.class";

const WELCOME_PATH = "/user-info";
const THANKS_PATH = "/thanks";
const FEEDBACK_PATH = "/";

@Component({
  selector: 'i24-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  thanksAnimation: AnimateActionEnum;
  welcomeFormAnimation: AnimateActionEnum;
  userInfo: Option<UserInfo>;
  loading: boolean = true;

  constructor(private location: Location,
              private router: Router,
              private userInfoService: UserInfoService,
              private surveyService: SurveysService) {
    this.thanksAnimation = AnimateActionEnum.Visible;
    this.welcomeFormAnimation = AnimateActionEnum.Hidden;
  }

  ngOnInit() {
    this.checkSurveyResults().subscribe(_ => {
      this.userInfoService.getMyInfo()
        .finally(() => {
          this.loading = false;
          this.setView();
        })
        .subscribe(ui => this.userInfo = some(ui), err => this.userInfo = none);
    });
  }

  onAccepted(): void {
    if (this.getUserInfoProvided()) {
      this.router.navigate([FEEDBACK_PATH]);
    } else {
      this.switchModals();
    }
  }

  onUserInfo(userInfo: UserInfo): void {
    this.loading = true;
    this.userInfoService.updateMyInfo(userInfo)
      .finally(() => this.loading = false)
      .subscribe(_ => this.router.navigate([FEEDBACK_PATH]));
  }

  private checkSurveyResults(): Observable<SurveyResult> {
    return this.surveyService.getMySurveyResults(AppConfig.surveyId)
      .map(result => {
        if (result.surveySubmissions.length == 0) {
          location.pathname = AppConfig.surveyPath;
          return Observable.throw(result);
        } else {
          return result;
        }
      });
  }

  private setView(): void {
    if (this.location.path() == WELCOME_PATH) {
      this.switchModals();
    }
  }

  private switchModals(): void {
    this.location.replaceState(WELCOME_PATH);
    this.thanksAnimation = AnimateActionEnum.FadeOutLeftBig;
    this.welcomeFormAnimation = AnimateActionEnum.FadeInRightBig;
  }

  private getUserInfoProvided(): boolean {
    return this.userInfo.match({
      some: ui => {
        return ui.firstName.isDefined &&
          ui.sex.isDefined &&
          ui.birthdate.isDefined &&
          ui.weight.isDefined &&
          ui.height.isDefined;
      },
      none: () => false
    })
  }

}
