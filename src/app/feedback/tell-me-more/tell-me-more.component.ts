import {Component, OnInit, Input, OnChanges, Output, EventEmitter} from '@angular/core';
import {AnimateActionEnum, AnimateActionAlias} from "../../../animations/animate-action.enum";
import {trigger, state, style, transition, animate, keyframes} from "@angular/animations";
import {PlayingCardDetails} from "../playing-card/playing-card.component";

const MODAL_ANIMATION_DURATION = 500;
const BACKDROP_ANIMATION_DURATION = 300;

@Component({
  selector: 'i24-tell-me-more',
  templateUrl: 'tell-me-more.component.html',
  styleUrls: ['tell-me-more.component.scss'],
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

export class TellMeMoreComponent implements OnChanges {

  @Input() active: boolean;
  @Input() details: PlayingCardDetails[];
  @Output() activeChange = new EventEmitter<any>();

  alertAnimation: AnimateActionEnum;

  constructor() {
    this.alertAnimation = AnimateActionEnum.Hidden;
  }

  ngOnChanges() {
    if (this.active) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }

  toggleAlert(): void {
    if (AnimateActionAlias.getItem(this.alertAnimation) == AnimateActionEnum.Hidden) {
      this.alertAnimation = AnimateActionEnum.FadeInDown;
    } else {
      this.alertAnimation = AnimateActionEnum.FadeOutUp;
    }
  }

  close(): void {
    this.active = false;
    this.activeChange.emit();
  }

}
