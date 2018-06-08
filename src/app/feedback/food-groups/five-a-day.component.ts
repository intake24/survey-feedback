import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {SELECTOR_PREFIX} from "../feedback.const";
import {FeedbackCardComponent} from "../feedback-card/feedback-card";


export class FiveADayCardParameters {
  readonly cardType = "five-a-day";
}

@Component({
  selector: SELECTOR_PREFIX + "five-a-day-card",
  templateUrl: "./five-a-day.component.html",
  styleUrls: ["./five-a-day.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiveADayCardComponent extends FeedbackCardComponent {

}
