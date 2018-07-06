import {ChangeDetectionStrategy, Component, Input} from "@angular/core";
import {SELECTOR_PREFIX} from "../feedback.const";
import {FeedbackCardComponent} from "../feedback-card/feedback-card";
import {PlayingCardDetails} from "../character-card/character-card.component";
import {DemographicRange, DemographicScaleSectorSentimentEnum} from "../../classes/demographic-group.class";


export class FoodGroupCardParameters {
  readonly cardType = "food-group";

  readonly foodGroupName: string;
  readonly intake: number;
  readonly backgroundClass: string;
  readonly details: PlayingCardDetails;

  constructor(foodGroupName: string, intake: number, backgroundClass: string, details: PlayingCardDetails) {
    this.foodGroupName = foodGroupName;
    this.intake = intake;
    this.backgroundClass = backgroundClass;
    this.details = details;
  }
}

@Component({
  selector: SELECTOR_PREFIX + "food-group-card",
  templateUrl: "./food-group-card.component.html",
  styleUrls: ["./food-group-card.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FoodGroupCardComponent extends FeedbackCardComponent {

  @Input() parameters: FoodGroupCardParameters;

  tellMeMore(): void {
    console.log(this.parameters);
    this.onTellMeMore.emit([this.parameters.details]);
  }
}
