import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {AnimateActionEnum} from "../../../animations/animate-action.enum";
import {CharacterTypeEnum, CharacterSentimentEnum} from "../../classes/character.class";
import {trigger, state, style, transition, animate, keyframes} from "@angular/animations";
import {HelpService} from "../../services/help.service";
import {FeedbackMessage} from "../../classes/feedback-message.class";

const MODAL_ANIMATION_DURATION = 500;
const BACKDROP_ANIMATION_DURATION = 300;

@Component({
  selector: 'i24-feedback-helpful',
  templateUrl: 'feedback-helpful.component.html',
  styleUrls: ['feedback-helpful.component.scss'],
  animations: [
    trigger("modalAnimateState", [
      state(AnimateActionEnum.Visible.toString(), style({opacity: 1})),
      state(AnimateActionEnum.Hidden.toString(), style({opacity: 0})),

      transition(":enter", [
        animate(MODAL_ANIMATION_DURATION, keyframes([
          style({opacity: 0, transform: `translateY(2000px)`, offset: 0}),
          style({
            opacity: 1,
            transform: `translateY(-15px)`,
            offset: 0.7
          }),
          style({opacity: 1, transform: "translateY(0)", offset: 1.0})
        ]))
      ]),

      transition(":leave", [
        animate(MODAL_ANIMATION_DURATION, keyframes([
          style({opacity: 1, transform: `translateY(0)`, offset: 0}),
          style({
            opacity: 1,
            transform: `translateY(-15px)`,
            offset: 0.3
          }),
          style({opacity: 0, transform: "translateY(2000px)", offset: 1.0})
        ]))
      ])

    ]),

    trigger("backdropAnimateState", [
      state(AnimateActionEnum.Visible.toString(), style({opacity: 1})),
      state(AnimateActionEnum.Hidden.toString(), style({opacity: 0})),

      transition(":enter", [
        animate(BACKDROP_ANIMATION_DURATION, keyframes([
          style({opacity: 0, offset: 0}),
          style({opacity: 0.5, offset: 1.0})
        ]))
      ]),

      transition(":leave", [
        animate(BACKDROP_ANIMATION_DURATION, keyframes([
          style({opacity: 0.5, offset: 0}),
          style({opacity: 0, offset: 1.0})
        ]))
      ])

    ])
  ]
})
export class FeedbackHelpfulComponent implements OnInit, OnChanges {

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
  tooMuchOfFeedbackAnimation: AnimateActionEnum;
  submitting: boolean;
  tooMuchOfFeedback: boolean;

  modalIsActive: boolean;

  ngOnChanges() {
    if (this.modalIsActive) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }

  constructor(private helpService: HelpService) {
    this.reset();
  }

  ngOnInit() {
  }

  like(): void {
    this.liked = true;
    this.disliked = false;
    this.characterSentiment = CharacterSentimentEnum.EXCITING;
    this.feedbackFormAnimation = AnimateActionEnum.BounceInDown;
    this.modalIsActive = !this.modalIsActive ? true : this.modalIsActive;
    this.openModalIfClosed();
  }

  dislike(): void {
    this.disliked = true;
    this.liked = false;
    this.characterSentiment = CharacterSentimentEnum.WARNING;
    this.feedbackFormAnimation = AnimateActionEnum.BounceInDown;
    this.openModalIfClosed();
  }

  submitFeedback(): void {
    this.submitting = true;
    this.helpService.sendFeedback(new FeedbackMessage(this.liked && !this.disliked, window.location.href, this.feedbackText))
      .finally(() => this.submitting = false)
      .subscribe(() => {
        this.characterSentiment = CharacterSentimentEnum.HAPPY;
        this.feedbackRequestAnimation = AnimateActionEnum.BounceOutRight;
        this.showThankYouText = true;
      }, (err) => {
        if (err.status == 429) {
          this.characterSentiment = CharacterSentimentEnum.HAPPY;
          this.feedbackRequestAnimation = AnimateActionEnum.BounceOutRight;
          this.tooMuchOfFeedback = true;
        }
      });
  }

  onFeedbackRequestDisappeared($event): void {
    if (this.showThankYouText) {
      this.thankYouAnimation = AnimateActionEnum.BounceInRight;
    }
    if (this.tooMuchOfFeedback) {
      this.tooMuchOfFeedbackAnimation = AnimateActionEnum.BounceInRight;
    }
  }

  closeModal(): void {
    this.modalIsActive = false;
    if (!this.showThankYouText) {
      this.reset();
    }
    this.setBodyClass();
  }

  private openModalIfClosed(): void {
    this.modalIsActive = !this.modalIsActive ? true : this.modalIsActive;
    this.setBodyClass();
  }

  private setBodyClass(): void {
    if (this.modalIsActive) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }

  private reset(): void {
    this.feedbackFormAnimation = AnimateActionEnum.Hidden;
    this.feedbackRequestAnimation = AnimateActionEnum.Visible;
    this.thankYouAnimation = AnimateActionEnum.Hidden;
    this.tooMuchOfFeedbackAnimation = AnimateActionEnum.Hidden;
    this.characterType = CharacterTypeEnum.STRAWBERRY;
    this.characterSentiment = CharacterSentimentEnum.HAPPY;
    this.liked = false;
    this.disliked = false;
    this.feedbackText = "";
    this.showThankYouText = false;
    this.showFeedbackForm = false;
    this.tooMuchOfFeedback = false;
    this.submitting = false;
  }

}
