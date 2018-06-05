import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {UserInfoService} from "../services/user-info.service";
import {UserInfo} from "../classes/user-info.class";
import {none, Option, some} from "ts-option";
import {Router} from "@angular/router";
import {AppConfig} from "../conf";
import {SurveysService} from "../services/surveys.service";
import {forkJoin, Observable, throwError} from "rxjs";
import {SurveyStats} from "../classes/survey-result.class";
import {PhysicalActivityLevelsService} from "../services/physical-activity-levels.service";
import {PhysicalActivityLevel} from "../classes/physical-activity-level.class";
import {WeightTarget, WeightTargetsService} from "../services/weight-targets.service";
import {ErrorObservable} from "rxjs/observable/ErrorObservable";
import {SurveyFeedbackStyleEnum} from "../classes/survey-feedback-style.enum";
import {FeedbackStyleService} from "../services/feedback-style.service";
import {finalize, map} from "rxjs/internal/operators";
import {AnimateActionEnum} from "../../animate-ts/animate-action.enum";

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
  weightTargets: WeightTarget[];
  loading: boolean = true;
  surveyFeedbackStyle: SurveyFeedbackStyleEnum;

  constructor(private location: Location,
              private router: Router,
              private userInfoService: UserInfoService,
              private surveyService: SurveysService,
              private styleService: FeedbackStyleService,
              private physicalActivityLevelsService: PhysicalActivityLevelsService,
              private weightTargetsService: WeightTargetsService) {
    this.thanksAnimation = AnimateActionEnum.Hidden;
    this.welcomeFormAnimation = AnimateActionEnum.Hidden;
  }

  ngOnInit() {
    forkJoin(
      this.checkSurveyResults(),
      this.physicalActivityLevelsService.list(),
      this.weightTargetsService.list(),
      this.userInfoService.getMyInfo(),
      this.getFeedbackStyle()
    ).pipe(
      finalize(() => {
        this.setView();
        this.loading = false;
      })
    ).subscribe(res => {
      this.physicalActivityLevels = res[1];
      this.weightTargets = res[2];
      this.userInfo = some(res[3]);
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

  private checkSurveyResults(): Observable<ErrorObservable<any> | SurveyStats> {
    return this.surveyService.getMySurveyResults(AppConfig.surveyId).pipe(
      map((result: SurveyStats) => {
        if (result.surveySubmissions.length == 0) {
          location.pathname = AppConfig.surveyPath;
          return throwError(result);
        } else {
          return result;
        }
      })
    );
  }

  private getFeedbackStyle() {
    return this.styleService.getFeedbackStyle(AppConfig.surveyId).pipe(
      map((result: SurveyFeedbackStyleEnum) => this.surveyFeedbackStyle = result)
    );
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
