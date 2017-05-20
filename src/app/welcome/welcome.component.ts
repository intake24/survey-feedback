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
import {PhysicalActivityLevelsService} from "../services/physical-activity-levels.service";
import {PhysicalActivityLevel} from "../classes/physical-activity-level.class";

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
  physicalActivityLevels: PhysicalActivityLevel[];
  loading: boolean = true;

  constructor(private location: Location,
              private router: Router,
              private userInfoService: UserInfoService,
              private surveyService: SurveysService,
              private physicalActivityLevelsService: PhysicalActivityLevelsService) {
    this.thanksAnimation = AnimateActionEnum.Hidden;
    this.welcomeFormAnimation = AnimateActionEnum.Hidden;
  }

  ngOnInit() {
    Observable.forkJoin(
      this.checkSurveyResults(),
      this.physicalActivityLevelsService.list(),
      this.userInfoService.getMyInfo()
    ).finally(() => {
      this.setView();
      this.loading = false;
    }).subscribe(res => {
      this.userInfo = some(res[2]);
      this.physicalActivityLevels = res[1];
    }, err => {
      console.error(err);
      this.userInfo = none;
    })
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
    this.welcomeFormAnimation = AnimateActionEnum.BounceOutDownBig;
    this.userInfoService.updateMyInfo(userInfo)
      .subscribe(_ => {
        this.router.navigate([FEEDBACK_PATH]);
      }, error => {
        this.loading = false;
        this.welcomeFormAnimation = AnimateActionEnum.BounceInUpBig;
      });
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
      this.welcomeFormAnimation = AnimateActionEnum.BounceInUp;
    } else {
      this.thanksAnimation = AnimateActionEnum.BounceInUp;
    }
  }

  private switchModals(): void {
    this.location.replaceState(WELCOME_PATH);
    this.thanksAnimation = AnimateActionEnum.BounceOutLeftBig;
    this.welcomeFormAnimation = AnimateActionEnum.BounceInRightBig;
  }

  private getUserInfoProvided(): boolean {
    return this.userInfo.match({
      some: ui => {
        return ui.name.isDefined &&
          ui.sex.isDefined &&
          ui.birthdate.isDefined &&
          ui.weight.isDefined &&
          ui.height.isDefined;
      },
      none: () => false
    })
  }

}
