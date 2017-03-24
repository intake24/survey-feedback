import {Component, Input} from "@angular/core";
import {UserDemographic} from "../../classes/demographic-group.class";
import {AnimateActionEnum} from "../../../animations/animate-action.enum";

@Component({
  selector: "user-demographic-info",
  templateUrl: "./user-demographic-info.component.html",
  styleUrls: ["./user-demographic-info.component.scss"]
})

export class UserDemographicInfoComponent {

  readonly animation: AnimateActionEnum = AnimateActionEnum.FadeInDown;

  @Input() userDemographic: UserDemographic;

  constructor() {
  }

}
