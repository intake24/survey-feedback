import {FeedbackCardParameters} from "../playing-cards/playing-cards.component";
import {PlayingCardDetails} from "../character-card/character-card.component";
import {EventEmitter, Input, Output} from "@angular/core";
import {SurveyFeedbackStyleEnum} from "../../classes/survey-feedback-style.enum";

export abstract class FeedbackCardComponent {
  @Input() parameters: FeedbackCardParameters;
  @Input() feedbackStyle: SurveyFeedbackStyleEnum;

  @Output() onTellMeMore: EventEmitter<PlayingCardDetails[]>;

  onEnteredViewport(): void {

  }

  onLeftViewport(): void {

  }

  constructor() {
    this.onTellMeMore = new EventEmitter();
  }
}
