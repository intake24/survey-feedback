import {
  Component, ChangeDetectionStrategy, trigger, state, style, transition, animate, keyframes
} from "@angular/core";
import {
  FADE_DURATION, FADE_SHORT_START_FROM, FADE_SHORT_BOUNCE_DISTANCE,
  FADE_SHORT_BOUNCE_FRAME_START
} from "../animate.config";
import {VisibilityControl} from "../visibility-control.class";

@Component({
  selector: "zoom-in",
  templateUrl: "../animate.template.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger("animateState", [
      state("visible", style({transform: "translateY(0)", opacity: 1})),
      state("hidden", style({transform: `translateY(-${FADE_SHORT_START_FROM})`, opacity: 0})),
      transition("hidden => visible", [
        animate(FADE_DURATION, keyframes([
          style({opacity: 0, transform: `translateY(-${FADE_SHORT_START_FROM})`, offset: 0}),
          style({opacity: 1, transform: `translateY(${FADE_SHORT_BOUNCE_DISTANCE}px)`, offset: FADE_SHORT_BOUNCE_FRAME_START}),
          style({opacity: 1, transform: "translateY(0)", offset: 1.0})
        ]))
      ])
    ])
  ]
})

export class ZoomInComponent extends VisibilityControl {

  constructor() {
    super();
  }

}
