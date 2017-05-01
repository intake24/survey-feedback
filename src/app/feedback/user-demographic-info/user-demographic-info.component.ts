import {Component, Input} from "@angular/core";
import {AnimateActionEnum} from "../../../animations/animate-action.enum";
import {AppConfig} from "../../conf";
import {UserDemographic} from "../../classes/user-demographic.class";

@Component({
  selector: "user-demographic-info",
  templateUrl: "./user-demographic-info.component.html",
  styleUrls: ["./user-demographic-info.component.scss"]
})

export class UserDemographicInfoComponent {

  readonly animation: AnimateActionEnum = AnimateActionEnum.BounceInDown;
  readonly surveyPath: string = AppConfig.surveyPath;

  @Input() userDemographic: UserDemographic;
  @Input() daysRecorded: number;

  constructor() {
  }

}
