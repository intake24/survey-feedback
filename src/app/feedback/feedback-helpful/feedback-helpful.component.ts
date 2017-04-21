import { Component, OnInit } from '@angular/core';
import {AnimateActionEnum} from "../../../animations/animate-action.enum";
import {CharacterTypeEnum, CharacterSentimentEnum} from "../../classes/character.class";

@Component({
  selector: 'i24-feedback-helpful',
  templateUrl: 'feedback-helpful.component.html',
  styleUrls: ['feedback-helpful.component.scss']
})
export class FeedbackHelpfulComponent implements OnInit {

  feedbackText: string;
  liked: boolean;
  disliked: boolean;
  showFeedbackForm: boolean;
  showThankYouText: boolean;
  characterType: CharacterTypeEnum;
  characterSentiment: CharacterSentimentEnum;
  feedbackFormAnimation: AnimateActionEnum;
  feedbackRequestAnimation: AnimateActionEnum;
  thankYouAnimation: AnimateActionEnum;

  constructor() {
    this.feedbackFormAnimation = AnimateActionEnum.Hidden;
    this.feedbackRequestAnimation = AnimateActionEnum.Visible;
    this.thankYouAnimation = AnimateActionEnum.Hidden;
    this.characterType = CharacterTypeEnum.STRAWBERRY;
    this.characterSentiment = CharacterSentimentEnum.HAPPY;
    this.liked = false;
    this.disliked = false;
    this.showThankYouText = false;
    this.showFeedbackForm = false;
  }

  ngOnInit() {
  }

  like(): void {
    this.liked = true;
    this.disliked = false;
    this.characterSentiment = CharacterSentimentEnum.EXCITING;
    this.feedbackFormAnimation = AnimateActionEnum.FadeInDown;
  }

  dislike(): void {
    this.disliked = true;
    this.liked = false;
    this.characterSentiment = CharacterSentimentEnum.WARNING;
    this.feedbackFormAnimation = AnimateActionEnum.FadeInDown;
  }

  submitFeedback(): void {
    this.characterSentiment = CharacterSentimentEnum.HAPPY;
    this.feedbackRequestAnimation = AnimateActionEnum.FadeOutRight;
    this.showThankYouText = true;
  }

  onFeedbackRequestDisappeared($event): void {
    console.log($event);
    this.thankYouAnimation = AnimateActionEnum.FadeInRight;
  }

}
