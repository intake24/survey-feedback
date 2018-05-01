import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output} from "@angular/core";
import {AnimationEvent, state, style, trigger} from "@angular/animations";
import {AnimateActionAlias, AnimateActionEnum} from "./animate-action.enum";
import {AnimateFrame} from "./animate-frame.class";
import {AnimateBounces} from "./animate-bounces.class";
import {AnimateFades} from "./animate-fades.class";
import {AnimateZooms} from "./animate-zooms.class";

let AnimateTransitions = [
  state(AnimateActionEnum.Visible.toString(), style({opacity: 1})),
  state(AnimateActionEnum.Hidden.toString(), style({opacity: 0})),
];

AnimateTransitions.push.apply(AnimateTransitions, AnimateBounces.animations);
AnimateTransitions.push.apply(AnimateTransitions, AnimateFades.animations);
AnimateTransitions.push.apply(AnimateTransitions, AnimateZooms.animations);

@Component({
  selector: "animate",
  templateUrl: "./animate.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger("animateState", AnimateTransitions)
  ]
})

export class AnimateComponent implements OnChanges {

  @Input() action: AnimateActionEnum;
  @Input() actionQueue: AnimateFrame[];
  @Input() display: boolean;

  @Output() started: EventEmitter<any> = new EventEmitter();
  @Output() done: EventEmitter<any> = new EventEmitter();

  @Output() onShown: EventEmitter<any> = new EventEmitter();
  @Output() onHidden: EventEmitter<any> = new EventEmitter();

  displayed: boolean;

  constructor() {
  }

  ngOnChanges(): void {
    if (this.actionQueue != null &&
      this.actionQueue.length != 0) {
      this.startAnimationQueue();
    }
  }

  emitStarted($event: AnimationEvent): void {
    this.setDisplayed();
    this.started.emit($event);
  }

  emitDone($event: AnimationEvent): void {
    this.setNotDisplayed();
    this.refreshAction();
    this.emitVisibility($event);
  }

  private startAnimationQueue(): void {
    let nextFrame = this.actionQueue.shift();
    this.action = nextFrame.action
  }

  private setDisplayed(): void {
    if (AnimateActionAlias.getItem(this.action) == AnimateActionEnum.Visible || this.display != false) {
      this.displayed = true;
    }
  }

  private setNotDisplayed(): void {
    if (AnimateActionAlias.getItem(this.action) == AnimateActionEnum.Hidden && this.display == false) {
      this.displayed = false;
    }
  }

  private refreshAction(): void {
    if (this.actionQueue && this.actionQueue.length) {
      this.startAnimationQueue();
    } else {
      this.action = AnimateActionAlias.getItem(this.action);
    }
  }

  private emitVisibility($event): void {
    this.done.emit($event);
    if (AnimateActionAlias.getItem(this.action) == AnimateActionEnum.Hidden) {
      this.onHidden.emit($event);
    } else {
      this.onShown.emit($event);
    }
  }

}
