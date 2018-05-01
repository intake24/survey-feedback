import {Component, OnInit} from '@angular/core';
import {AnimateActionEnum} from "../../../animate-ts/animate-action.enum";

const LOCAL_STORAGE_CONSENT_ITEM_NAME = "consentAccepted";

@Component({
  selector: 'i24-consent-alert',
  templateUrl: './consent-alert.component.html',
  styleUrls: ['./consent-alert.component.scss']
})
export class ConsentAlertComponent implements OnInit {

  consentAccepted: boolean;
  animationState: AnimateActionEnum;

  constructor() {
    this.setConsent();
    this.setAnimation();
  }

  ngOnInit() {
  }

  acceptConsent(): void {
    this.consentAccepted = true;
    localStorage.setItem(LOCAL_STORAGE_CONSENT_ITEM_NAME, this.consentAccepted.toString());
    this.animationState = AnimateActionEnum.FadeOutUp;
  }

  private setConsent(): void {
    this.consentAccepted = localStorage.getItem(LOCAL_STORAGE_CONSENT_ITEM_NAME) == "true";
  }

  private setAnimation(): void {
    if (this.consentAccepted) {
      this.animationState = AnimateActionEnum.Hidden;
    } else {
      this.animationState = AnimateActionEnum.Visible;
    }
  }

}
