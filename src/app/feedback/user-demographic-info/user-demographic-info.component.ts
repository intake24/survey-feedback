import {Component, Input} from "@angular/core";
import {UserDemographic} from "../../classes/demographic-group.class";
import {AnimateActionEnum} from "../../../animations/animate-action.enum";
import {AppConfig} from "../../conf";

@Component({
  selector: "user-demographic-info",
  templateUrl: "./user-demographic-info.component.html",
  styleUrls: ["./user-demographic-info.component.scss"]
})

export class UserDemographicInfoComponent {

  readonly animation: AnimateActionEnum = AnimateActionEnum.FadeInDown;
  readonly surveyPath: string = AppConfig.surveyPath;

  @Input() userDemographic: UserDemographic;
  @Input() daysRecorded: number;

  constructor() {
  }

}
