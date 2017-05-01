import {transition, animate, keyframes, style} from "@angular/animations";
import {AnimateActionEnum} from "./animate-action.enum";
import {
  ANIMATION_DURATION, FADE_START_OFFSET, FADE_BOUNCE_OFFSET,
  FADE_BOUNCE_START_FRAME_OFFSET, ANIMATION_BIG_DURATION, FADE_BIG_START_OFFSET
} from "./animate.config";

const AnimateBounces = [
  transition(AnimateActionEnum.Hidden.toString() + "=>" + AnimateActionEnum.BounceInUp.toString(), [
    animate(ANIMATION_DURATION, keyframes([
      style({opacity: 0, transform: "translateY(" + FADE_START_OFFSET + ")", offset: 0}),
      style({
        opacity: 1,
        transform: "translateY(-" + FADE_BOUNCE_OFFSET + ")",
        offset: FADE_BOUNCE_START_FRAME_OFFSET
      }),
      style({opacity: 1, transform: "translate(0,0)", offset: 1.0})
    ]))
  ]),

  transition(AnimateActionEnum.Hidden.toString() + "=>" + AnimateActionEnum.BounceInUpBig.toString(), [
    animate(ANIMATION_BIG_DURATION, keyframes([
      style({opacity: 0, transform: "translateY(" + FADE_BIG_START_OFFSET + ")", offset: 0}),
      style({
        opacity: 1,
        transform: "translateY(-" + FADE_BOUNCE_OFFSET + ")",
        offset: FADE_BOUNCE_START_FRAME_OFFSET
      }),
      style({opacity: 1, transform: "translate(0,0)", offset: 1.0})
    ]))
  ]),

  transition(AnimateActionEnum.Hidden.toString() + "=>" + AnimateActionEnum.BounceInDown.toString(), [
    animate(ANIMATION_DURATION, keyframes([
      style({opacity: 0, transform: "translateY(-" + FADE_START_OFFSET + ")", offset: 0}),
      style({
        opacity: 1,
        transform: "translateY(" + FADE_BOUNCE_OFFSET + ")",
        offset: FADE_BOUNCE_START_FRAME_OFFSET
      }),
      style({opacity: 1, transform: "translate(0,0)", offset: 1.0})
    ]))
  ]),

  transition(AnimateActionEnum.Hidden.toString() + "=>" + AnimateActionEnum.BounceInDownBig.toString(), [
    animate(ANIMATION_BIG_DURATION, keyframes([
      style({opacity: 0, transform: "translateY(-" + FADE_BIG_START_OFFSET + ")", offset: 0}),
      style({
        opacity: 1,
        transform: "translateY(" + FADE_BOUNCE_OFFSET + ")",
        offset: FADE_BOUNCE_START_FRAME_OFFSET
      }),
      style({opacity: 1, transform: "translate(0,0)", offset: 1.0})
    ]))
  ]),

  transition(AnimateActionEnum.Hidden.toString() + "=>" + AnimateActionEnum.BounceInLeft.toString(), [
    animate(ANIMATION_DURATION, keyframes([
      style({opacity: 0, transform: "translateX(-" + FADE_START_OFFSET + ")", offset: 0}),
      style({
        opacity: 1,
        transform: "translateX(" + FADE_BOUNCE_OFFSET + ")",
        offset: FADE_BOUNCE_START_FRAME_OFFSET
      }),
      style({opacity: 1, transform: "translate(0,0)", offset: 1.0})
    ]))
  ]),

  transition(AnimateActionEnum.Hidden.toString() + "=>" + AnimateActionEnum.BounceInLeftBig.toString(), [
    animate(ANIMATION_BIG_DURATION, keyframes([
      style({opacity: 0, transform: "translateX(-" + FADE_BIG_START_OFFSET + ")", offset: 0}),
      style({
        opacity: 1,
        transform: "translateX(" + FADE_BOUNCE_OFFSET + ")",
        offset: FADE_BOUNCE_START_FRAME_OFFSET
      }),
      style({opacity: 1, transform: "translate(0,0)", offset: 1.0})
    ]))
  ]),

  transition(AnimateActionEnum.Visible.toString() + "=>" + AnimateActionEnum.BounceOutLeft.toString(), [
    animate(ANIMATION_DURATION, keyframes([
      style({opacity: 1, transform: "translate(0,0)", offset: 0}),
      style({
        opacity: 1,
        transform: "translateX(" + FADE_BOUNCE_OFFSET + ")",
        offset: FADE_BOUNCE_START_FRAME_OFFSET
      }),
      style({opacity: 0, transform: "translateX(-" + FADE_START_OFFSET + ")", offset: 1.0})
    ]))
  ]),

  transition(AnimateActionEnum.Visible.toString() + "=>" + AnimateActionEnum.BounceOut.toString(), [
    animate(ANIMATION_DURATION, keyframes([
      style({opacity: 1, offset: 0}),
      style({opacity: 0, offset: 1.0})
    ]))
  ]),

  transition(AnimateActionEnum.Visible.toString() + "=>" + AnimateActionEnum.BounceOutUp.toString(), [
    animate(ANIMATION_DURATION, keyframes([
      style({opacity: 1, transform: "translate(0,0)", offset: 0}),
      style({
        opacity: 1,
        transform: "translateY(" + FADE_BOUNCE_OFFSET + ")",
        offset: FADE_BOUNCE_START_FRAME_OFFSET
      }),
      style({opacity: 0, transform: "translateY(-" + FADE_START_OFFSET + ")", offset: 1.0})
    ]))
  ]),

  transition(AnimateActionEnum.Visible.toString() + "=>" + AnimateActionEnum.BounceOutDown.toString(), [
    animate(ANIMATION_DURATION, keyframes([
      style({opacity: 1, transform: "translate(0,0)", offset: 0}),
      style({
        opacity: 1,
        transform: "translateY(-" + FADE_BOUNCE_OFFSET + ")",
        offset: FADE_BOUNCE_START_FRAME_OFFSET
      }),
      style({opacity: 0, transform: "translateY(" + FADE_START_OFFSET + ")", offset: 1.0})
    ]))
  ]),

  transition(AnimateActionEnum.Visible.toString() + "=>" + AnimateActionEnum.BounceOutDownBig.toString(), [
    animate(ANIMATION_BIG_DURATION, keyframes([
      style({opacity: 1, transform: "translate(0,0)", offset: 0}),
      style({
        opacity: 1,
        transform: "translateY(-" + FADE_BOUNCE_OFFSET + ")",
        offset: FADE_BOUNCE_START_FRAME_OFFSET
      }),
      style({opacity: 0, transform: "translateY(" + FADE_BIG_START_OFFSET + ")", offset: 1.0})
    ]))
  ]),

  transition(AnimateActionEnum.Visible.toString() + "=>" + AnimateActionEnum.BounceOutLeftBig.toString(), [
    animate(ANIMATION_BIG_DURATION, keyframes([
      style({opacity: 1, transform: "translate(0,0)", offset: 0}),
      style({
        opacity: 1,
        transform: "translateX(" + FADE_BOUNCE_OFFSET + ")",
        offset: FADE_BOUNCE_START_FRAME_OFFSET
      }),
      style({opacity: 0, transform: "translateX(-" + FADE_BIG_START_OFFSET + ")", offset: 1.0})
    ]))
  ]),

  transition(AnimateActionEnum.Hidden.toString() + "=>" + AnimateActionEnum.BounceInRight.toString(), [
    animate(ANIMATION_DURATION, keyframes([
      style({opacity: 0, transform: "translateX(" + FADE_START_OFFSET + ")", offset: 0}),
      style({
        opacity: 1,
        transform: "translateX(-" + FADE_BOUNCE_OFFSET + ")",
        offset: FADE_BOUNCE_START_FRAME_OFFSET
      }),
      style({opacity: 1, transform: "translate(0,0)", offset: 1.0})
    ]))
  ]),

  transition(AnimateActionEnum.Hidden.toString() + "=>" + AnimateActionEnum.BounceInRightBig.toString(), [
    animate(ANIMATION_BIG_DURATION, keyframes([
      style({opacity: 0, transform: "translateX(" + FADE_BIG_START_OFFSET + ")", offset: 0}),
      style({
        opacity: 1,
        transform: "translateX(-" + FADE_BOUNCE_OFFSET + ")",
        offset: FADE_BOUNCE_START_FRAME_OFFSET
      }),
      style({opacity: 1, transform: "translate(0,0)", offset: 1.0})
    ]))
  ]),

  transition(AnimateActionEnum.Visible.toString() + "=>" + AnimateActionEnum.BounceOutRight.toString(), [
    animate(ANIMATION_DURATION, keyframes([
      style({opacity: 1, transform: "translate(0,0)", offset: 0}),
      style({
        opacity: 1,
        transform: "translateX(-" + FADE_BOUNCE_OFFSET + ")",
        offset: FADE_BOUNCE_START_FRAME_OFFSET
      }),
      style({opacity: 0, transform: "translateX(" + FADE_START_OFFSET + ")", offset: 1.0})
    ]))
  ]),

  transition(AnimateActionEnum.Visible.toString() + "=>" + AnimateActionEnum.BounceOutRightBig.toString(), [
    animate(ANIMATION_BIG_DURATION, keyframes([
      style({opacity: 1, transform: "translate(0,0)", offset: 0}),
      style({
        opacity: 1,
        transform: "translateX(-" + FADE_BOUNCE_OFFSET + ")",
        offset: FADE_BOUNCE_START_FRAME_OFFSET
      }),
      style({opacity: 0, transform: "translateX(" + FADE_BIG_START_OFFSET + ")", offset: 1.0})
    ]))
  ])
];
