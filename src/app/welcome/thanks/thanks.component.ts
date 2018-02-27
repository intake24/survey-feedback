import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {CharacterTypeEnum, CharacterSentimentEnum} from "../../classes/character.class";
import {SurveyFeedbackStyleEnum} from "../../classes/survey-feedback-style.enum";
import {ThankYouMessages} from "./thanks-messages.const"

@Component({
  selector: 'i24-thanks',
  templateUrl: './thanks.component.html',
  styleUrls: ['./thanks.component.scss']
})
export class ThanksComponent implements OnInit {

  characterType: CharacterTypeEnum = CharacterTypeEnum.STRAWBERRY;
  characterSentiment: CharacterSentimentEnum = CharacterSentimentEnum.HAPPY;
  content = ThankYouMessages;

  @Input() feedbackStyle: SurveyFeedbackStyleEnum;
  @Output() onAccepted: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  accept(): void {
    this.onAccepted.emit();
  }

  get smileyIsVisible(): boolean {
    return this.feedbackStyle == SurveyFeedbackStyleEnum.Playful;
  }

}
