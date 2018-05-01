import {animate, AnimationTransitionMetadata, keyframes, style, transition} from "@angular/animations";
import {AnimateActionEnum} from "./animate-action.enum";
import {ANIMATION_BIG_DURATION, ANIMATION_DURATION, FADE_BIG_START_OFFSET, FADE_START_OFFSET} from "./animate.config";

export class AnimateFades {
  static get animations(): ReadonlyArray<AnimationTransitionMetadata> {
    return [
      transition(AnimateActionEnum.Hidden.toString() + "=>" + AnimateActionEnum.FadeIn.toString(), [
        animate(ANIMATION_DURATION, keyframes([
          style({opacity: 0, offset: 0}),
          style({opacity: 1, offset: 1.0})
        ]))
      ]),

      transition(AnimateActionEnum.Hidden.toString() + "=>" + AnimateActionEnum.FadeInUp.toString(), [
        animate(ANIMATION_DURATION, keyframes([
          style({opacity: 0, transform: "translateY(" + FADE_START_OFFSET + ")", offset: 0}),
          style({opacity: 1, transform: "translate(0,0)", offset: 1.0})
        ]))
      ]),

      transition(AnimateActionEnum.Hidden.toString() + "=>" + AnimateActionEnum.FadeInUpBig.toString(), [
        animate(ANIMATION_BIG_DURATION, keyframes([
          style({opacity: 0, transform: "translateY(" + FADE_BIG_START_OFFSET + ")", offset: 0}),
          style({opacity: 1, transform: "translate(0,0)", offset: 1.0})
        ]))
      ]),

      transition(AnimateActionEnum.Hidden.toString() + "=>" + AnimateActionEnum.FadeInDown.toString(), [
        animate(ANIMATION_DURATION, keyframes([
          style({opacity: 0, transform: "translateY(-" + FADE_START_OFFSET + ")", offset: 0}),
          style({opacity: 1, transform: "translate(0,0)", offset: 1.0})
        ]))
      ]),

      transition(AnimateActionEnum.Hidden.toString() + "=>" + AnimateActionEnum.FadeInDownBig.toString(), [
        animate(ANIMATION_BIG_DURATION, keyframes([
          style({opacity: 0, transform: "translateY(-" + FADE_BIG_START_OFFSET + ")", offset: 0}),
          style({opacity: 1, transform: "translate(0,0)", offset: 1.0})
        ]))
      ]),

      transition(AnimateActionEnum.Hidden.toString() + "=>" + AnimateActionEnum.FadeInLeft.toString(), [
        animate(ANIMATION_DURATION, keyframes([
          style({opacity: 0, transform: "translateX(-" + FADE_START_OFFSET + ")", offset: 0}),
          style({opacity: 1, transform: "translate(0,0)", offset: 1.0})
        ]))
      ]),

      transition(AnimateActionEnum.Hidden.toString() + "=>" + AnimateActionEnum.FadeInLeftBig.toString(), [
        animate(ANIMATION_BIG_DURATION, keyframes([
          style({opacity: 0, transform: "translateX(-" + FADE_BIG_START_OFFSET + ")", offset: 0}),
          style({opacity: 1, transform: "translate(0,0)", offset: 1.0})
        ]))
      ]),

      transition(AnimateActionEnum.Visible.toString() + "=>" + AnimateActionEnum.FadeOut.toString(), [
        animate(ANIMATION_DURATION, keyframes([
          style({opacity: 1, offset: 0}),
          style({opacity: 0, offset: 1.0})
        ]))
      ]),

      transition(AnimateActionEnum.Visible.toString() + "=>" + AnimateActionEnum.FadeOutLeft.toString(), [
        animate(ANIMATION_DURATION, keyframes([
          style({opacity: 1, transform: "translate(0,0)", offset: 0}),
          style({opacity: 0, transform: "translateX(-" + FADE_START_OFFSET + ")", offset: 1.0})
        ]))
      ]),

      transition(AnimateActionEnum.Visible.toString() + "=>" + AnimateActionEnum.FadeOutUp.toString(), [
        animate(ANIMATION_DURATION, keyframes([
          style({opacity: 1, transform: "translate(0,0)", offset: 0}),
          style({opacity: 0, transform: "translateY(-" + FADE_START_OFFSET + ")", offset: 1.0})
        ]))
      ]),

      transition(AnimateActionEnum.Visible.toString() + "=>" + AnimateActionEnum.FadeOutDown.toString(), [
        animate(ANIMATION_DURATION, keyframes([
          style({opacity: 1, transform: "translate(0,0)", offset: 0}),
          style({opacity: 0, transform: "translateY(" + FADE_START_OFFSET + ")", offset: 1.0})
        ]))
      ]),

      transition(AnimateActionEnum.Visible.toString() + "=>" + AnimateActionEnum.FadeOutDownBig.toString(), [
        animate(ANIMATION_BIG_DURATION, keyframes([
          style({opacity: 1, transform: "translate(0,0)", offset: 0}),
          style({opacity: 0, transform: "translateY(" + FADE_BIG_START_OFFSET + ")", offset: 1.0})
        ]))
      ]),

      transition(AnimateActionEnum.Visible.toString() + "=>" + AnimateActionEnum.FadeOutLeftBig.toString(), [
        animate(ANIMATION_BIG_DURATION, keyframes([
          style({opacity: 1, transform: "translate(0,0)", offset: 0}),
          style({opacity: 0, transform: "translateX(-" + FADE_BIG_START_OFFSET + ")", offset: 1.0})
        ]))
      ]),

      transition(AnimateActionEnum.Hidden.toString() + "=>" + AnimateActionEnum.FadeInRight.toString(), [
        animate(ANIMATION_DURATION, keyframes([
          style({opacity: 0, transform: "translateX(" + FADE_START_OFFSET + ")", offset: 0}),
          style({opacity: 1, transform: "translate(0,0)", offset: 1.0})
        ]))
      ]),

      transition(AnimateActionEnum.Hidden.toString() + "=>" + AnimateActionEnum.FadeInRightBig.toString(), [
        animate(ANIMATION_BIG_DURATION, keyframes([
          style({opacity: 0, transform: "translateX(" + FADE_BIG_START_OFFSET + ")", offset: 0}),
          style({opacity: 1, transform: "translate(0,0)", offset: 1.0})
        ]))
      ]),

      transition(AnimateActionEnum.Visible.toString() + "=>" + AnimateActionEnum.FadeOutRight.toString(), [
        animate(ANIMATION_DURATION, keyframes([
          style({opacity: 1, transform: "translate(0,0)", offset: 0}),
          style({opacity: 0, transform: "translateX(" + FADE_START_OFFSET + ")", offset: 1.0})
        ]))
      ]),

      transition(AnimateActionEnum.Visible.toString() + "=>" + AnimateActionEnum.FadeOutRightBig.toString(), [
        animate(ANIMATION_BIG_DURATION, keyframes([
          style({opacity: 1, transform: "translate(0,0)", offset: 0}),
          style({opacity: 0, transform: "translateX(" + FADE_BIG_START_OFFSET + ")", offset: 1.0})
        ]))
      ])

    ]
  }
}
