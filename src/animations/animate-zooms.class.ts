import {animate, AnimationTransitionMetadata, keyframes, style, transition} from "@angular/animations";
import {AnimateActionEnum} from "./animate-action.enum";
import {ANIMATION_DURATION} from "./animate.config";

export class AnimateZooms {
  static get animations(): ReadonlyArray<AnimationTransitionMetadata> {
    return [
      transition(AnimateActionEnum.Hidden.toString() + "=>" + AnimateActionEnum.ZoomIn.toString(), [
        animate(ANIMATION_DURATION, keyframes([
          style({opacity: 0, transform: 'scale(0)'}),
          style({opacity: 1, transform: 'scale(1.1)'}),
          style({opacity: 1, transform: 'scale(1)'})
        ]))
      ])
    ]
  }
}
