import {AnimationTransitionMetadata, transition, animate, keyframes, style} from "@angular/animations";
import {AnimateActionEnum} from "./animate-action.enum";
import {ANIMATION_DURATION} from "./animate.config";

export class AnimateFades {
  static get animations(): ReadonlyArray<AnimationTransitionMetadata> {
    return [
      transition(AnimateActionEnum.Hidden.toString() + "=>" + AnimateActionEnum.FadeIn.toString(), [
        animate(ANIMATION_DURATION, keyframes([
          style({opacity: 0, offset: 0}),
          style({opacity: 1, offset: 1.0})
        ]))
      ]),
    ]
  }
}
