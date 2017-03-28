import { Component, OnInit } from '@angular/core';
import {AnimateActionEnum} from "../../animations/animate-action.enum";

@Component({
  selector: 'i24-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  accepted: boolean;
  thanksAnimation: AnimateActionEnum;
  welcomeFormAnimation: AnimateActionEnum;

  constructor() {
    this.thanksAnimation = AnimateActionEnum.Visible;
    this.welcomeFormAnimation = AnimateActionEnum.Hidden;
  }

  ngOnInit() {
    this.accepted = false;
  }

  onAccepted(): void {
    this.thanksAnimation = AnimateActionEnum.FadeOutLeftBig;
    this.welcomeFormAnimation = AnimateActionEnum.FadeInRightBig;
  }

}
