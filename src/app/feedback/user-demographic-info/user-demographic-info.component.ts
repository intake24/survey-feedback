import {Component, Input} from "@angular/core";
import {UserDemographic} from "../../classes/demographic-group.class";

@Component({
    selector: "user-demographic-info",
    templateUrl: "./user-demographic-info.component.html",
    styleUrls: ["./user-demographic-info.component.scss"]
})

export class UserDemographicInfoComponent {

    @Input() userDemographic: UserDemographic;

    constructor() {}

}
