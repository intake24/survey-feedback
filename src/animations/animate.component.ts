import {
  Component, ChangeDetectionStrategy, trigger, state, style, transition, animate, keyframes, Input
} from "@angular/core";
import {
  ANIMATION_DURATION, FADE_START_OFFSET, FADE_BOUNCE_OFFSET,
  FADE_BOUNCE_START_FRAME_OFFSET
} from "./animate.config";
import {AnimateActionEnum} from "./animate-action.enum";

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
            transform: `translateY(${FADE_BOUNCE_OFFSET}px)`,
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
            transform: `translateX(${FADE_BOUNCE_OFFSET}px)`,
            offset: FADE_BOUNCE_START_FRAME_OFFSET
          }),
          style({opacity: 1, transform: "translate(0,0)", offset: 1.0})
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

export class AnimateComponent {

  @Input() action: string;
  @Input() styleDisplay: string;

  state: string;

  constructor() {
    this.state = "void";
  }

}
