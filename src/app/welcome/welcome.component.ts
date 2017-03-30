import { Component, OnInit } from '@angular/core';
import {AnimateActionEnum} from "../../animations/animate-action.enum";

@Component({
  selector: 'i24-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  thanksAnimation: AnimateActionEnum;
  welcomeFormAnimation: AnimateActionEnum;

  constructor() {
    this.thanksAnimation = AnimateActionEnum.Visible;
    this.welcomeFormAnimation = AnimateActionEnum.Hidden;
  }

  ngOnInit() {

  }

  onAccepted(): void {
    this.thanksAnimation = AnimateActionEnum.FadeOutLeftBig;
    this.welcomeFormAnimation = AnimateActionEnum.FadeInRightBig;
  }

}
