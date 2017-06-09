import { Component, OnInit } from '@angular/core';
import {AppConfig} from "../../conf";

@Component({
  selector: 'i24-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  readonly imageSrc: string = "https://intake24.co.uk/assets/images/nu_logo.png";
  readonly privacyUrl: string = AppConfig.privacyUrl;
  readonly termsUrl: string = AppConfig.termsUrl;
  readonly year: number = new Date().getFullYear();
  readonly uniUrl: string = "https://openlab.ncl.ac.uk/";

  constructor() { }

  ngOnInit() {
  }

}
