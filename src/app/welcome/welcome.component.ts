import {Component, OnInit} from '@angular/core';
import {AnimateActionEnum} from "../../animations/animate-action.enum";
import {Location} from "@angular/common";
import {UserInfoService} from "../services/user-info.service";
import {UserInfo} from "../classes/user-info.class";
import {Option, some, none} from "ts-option";
import {Router} from "@angular/router";

const WELCOME_PATH = "/welcome";
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
              private userInfoService: UserInfoService) {
    this.thanksAnimation = AnimateActionEnum.Visible;
    this.welcomeFormAnimation = AnimateActionEnum.Hidden;
  }

  ngOnInit() {
    this.userInfoService.getMyInfo()
      .finally(() => {
        this.loading = false;
        this.setView();
      })
      .subscribe(ui => this.userInfo = some(ui), err => this.userInfo = none);
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
          ui.yearOfBirth.isDefined &&
          ui.weight.isDefined &&
          ui.height.isDefined;
      },
      none: () => false
    })
  }

}
