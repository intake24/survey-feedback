import {
  Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit, OnChanges
} from "@angular/core";
import {
  trigger, state, style, transition, animate, keyframes, AnimationEvent
} from "@angular/animations";
import {
  ANIMATION_DURATION, FADE_START_OFFSET, FADE_BOUNCE_OFFSET,
  FADE_BOUNCE_START_FRAME_OFFSET, FADE_BIG_START_OFFSET, ANIMATION_BIG_DURATION
} from "./animate.config";
import {AnimateActionEnum, AnimateActionAlias} from "./animate-action.enum";

@Component({
  selector: "animate",
  templateUrl: "./animate.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger("animateState", [
      state(AnimateActionEnum.Visible.toString(), style({opacity: 1})),
      state(AnimateActionEnum.Hidden.toString(), style({opacity: 0})),

      transition(`${AnimateActionEnum.Hidden.toString()} => ${AnimateActionEnum.FadeInDown.toString()}`, [
        animate(ANIMATION_DURATION, keyframes([
          style({opacity: 0, transform: `translateY(-${FADE_START_OFFSET})`, offset: 0}),
          style({
            opacity: 1,
            transform: `translateY(${FADE_BOUNCE_OFFSET})`,
            offset: FADE_BOUNCE_START_FRAME_OFFSET
          }),
          style({opacity: 1, transform: "translate(0,0)", offset: 1.0})
        ]))
      ]),

      transition(`${AnimateActionEnum.Hidden.toString()} => ${AnimateActionEnum.FadeInDownBig.toString()}`, [
        animate(ANIMATION_BIG_DURATION, keyframes([
          style({opacity: 0, transform: `translateY(-${FADE_BIG_START_OFFSET})`, offset: 0}),
          style({
            opacity: 1,
            transform: `translateY(${FADE_BOUNCE_OFFSET})`,
            offset: FADE_BOUNCE_START_FRAME_OFFSET
          }),
          style({opacity: 1, transform: "translate(0,0)", offset: 1.0})
        ]))
      ]),

      transition(`${AnimateActionEnum.Hidden.toString()} => ${AnimateActionEnum.FadeInLeft.toString()}`, [
        animate(ANIMATION_DURATION, keyframes([
          style({opacity: 0, transform: `translateX(-${FADE_START_OFFSET})`, offset: 0}),
          style({
            opacity: 1,
            transform: `translateX(${FADE_BOUNCE_OFFSET})`,
            offset: FADE_BOUNCE_START_FRAME_OFFSET
          }),
          style({opacity: 1, transform: "translate(0,0)", offset: 1.0})
        ]))
      ]),

      transition(`${AnimateActionEnum.Hidden.toString()} => ${AnimateActionEnum.FadeInLeftBig.toString()}`, [
        animate(ANIMATION_BIG_DURATION, keyframes([
          style({opacity: 0, transform: `translateX(-${FADE_BIG_START_OFFSET})`, offset: 0}),
          style({
            opacity: 1,
            transform: `translateX(${FADE_BOUNCE_OFFSET})`,
            offset: FADE_BOUNCE_START_FRAME_OFFSET
          }),
          style({opacity: 1, transform: "translate(0,0)", offset: 1.0})
        ]))
      ]),

      transition(`${AnimateActionEnum.Visible.toString()} => ${AnimateActionEnum.FadeOutLeft.toString()}`, [
        animate(ANIMATION_DURATION, keyframes([
          style({opacity: 1, transform: "translate(0,0)", offset: 0}),
          style({
            opacity: 1,
            transform: `translateX(${FADE_BOUNCE_OFFSET})`,
            offset: FADE_BOUNCE_START_FRAME_OFFSET
          }),
          style({opacity: 0, transform: `translateX(-${FADE_START_OFFSET})`, offset: 1.0})
        ]))
      ]),

      transition(`${AnimateActionEnum.Visible.toString()} => ${AnimateActionEnum.FadeOutLeftBig.toString()}`, [
        animate(ANIMATION_BIG_DURATION, keyframes([
          style({opacity: 1, transform: "translate(0,0)", offset: 0}),
          style({
            opacity: 1,
            transform: `translateX(${FADE_BOUNCE_OFFSET})`,
            offset: FADE_BOUNCE_START_FRAME_OFFSET
          }),
          style({opacity: 0, transform: `translateX(-${FADE_BIG_START_OFFSET})`, offset: 1.0})
        ]))
      ]),

      transition(`${AnimateActionEnum.Hidden.toString()} => ${AnimateActionEnum.FadeInRight.toString()}`, [
        animate(ANIMATION_DURATION, keyframes([
          style({opacity: 0, transform: `translateX(${FADE_START_OFFSET})`, offset: 0}),
          style({
            opacity: 1,
            transform: `translateX(-${FADE_BOUNCE_OFFSET})`,
            offset: FADE_BOUNCE_START_FRAME_OFFSET
          }),
          style({opacity: 1, transform: "translate(0,0)", offset: 1.0})
        ]))
      ]),

      transition(`${AnimateActionEnum.Hidden.toString()} => ${AnimateActionEnum.FadeInRightBig.toString()}`, [
        animate(ANIMATION_BIG_DURATION, keyframes([
          style({opacity: 0, transform: `translateX(${FADE_BIG_START_OFFSET})`, offset: 0}),
          style({
            opacity: 1,
            transform: `translateX(-${FADE_BOUNCE_OFFSET})`,
            offset: FADE_BOUNCE_START_FRAME_OFFSET
          }),
          style({opacity: 1, transform: "translate(0,0)", offset: 1.0})
        ]))
      ]),

      transition(`${AnimateActionEnum.Visible.toString()} => ${AnimateActionEnum.FadeOutRight.toString()}`, [
        animate(ANIMATION_DURATION, keyframes([
          style({opacity: 1, transform: "translate(0,0)", offset: 0}),
          style({
            opacity: 1,
            transform: `-translateX(${FADE_BOUNCE_OFFSET})`,
            offset: FADE_BOUNCE_START_FRAME_OFFSET
          }),
          style({opacity: 0, transform: `translateX(${FADE_START_OFFSET})`, offset: 1.0})
        ]))
      ]),

      transition(`${AnimateActionEnum.Visible.toString()} => ${AnimateActionEnum.FadeOutRightBig.toString()}`, [
        animate(ANIMATION_BIG_DURATION, keyframes([
          style({opacity: 1, transform: "translate(0,0)", offset: 0}),
          style({
            opacity: 1,
            transform: `-translateX(${FADE_BOUNCE_OFFSET})`,
            offset: FADE_BOUNCE_START_FRAME_OFFSET
          }),
          style({opacity: 0, transform: `translateX(${FADE_BIG_START_OFFSET})`, offset: 1.0})
        ]))
      ]),

      transition(`${AnimateActionEnum.Hidden.toString()} => ${AnimateActionEnum.ZoomIn.toString()}`, [
        animate(ANIMATION_DURATION, keyframes([
          style({opacity: 0, transform: 'scale(0)'}),
          style({opacity: 1, transform: 'scale(1.1)'}),
          style({opacity: 1, transform: 'scale(1)'})
        ]))
      ])

    ])
  ]
})

export class AnimateComponent implements OnChanges {

  @Input() action: AnimateActionEnum;
  @Input() display: boolean;

  @Output() started: EventEmitter<any> = new EventEmitter();
  @Output() done: EventEmitter<any> = new EventEmitter();

  displayed: boolean;

  constructor() {
  }

  ngOnChanges(): void {
    this.setDisplayed();
  }

  emitStarted($event: AnimationEvent): void {
    this.started.emit($event);
  }

  emitDone($event: AnimationEvent): void {
    this.setNotDisplayed();
    this.done.emit($event);
  }

  private setDisplayed() {
    if (AnimateActionAlias.aliasMap.get(this.action) == AnimateActionEnum.Visible || this.display != false) {
      this.displayed = true;
    }
  }

  private setNotDisplayed() {
    if (AnimateActionAlias.aliasMap.get(this.action) == AnimateActionEnum.Hidden && this.display == false) {
      this.displayed = false;
    }
  }

}
