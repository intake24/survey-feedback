import {Component, Input} from "@angular/core";
import {SELECTOR_PREFIX} from "../feedback.const";

@Component({
    selector: SELECTOR_PREFIX + "result-list-item",
    templateUrl: "./result-list-item.component.html",
    styleUrls: ["./result-list-item.component.scss"]
})

export class ResultListItemComponent {

    @Input() smileType;
    @Input() title;
    @Input() description;

}
