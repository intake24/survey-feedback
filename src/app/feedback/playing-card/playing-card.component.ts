import {
  Component, Input, ElementRef, HostListener, trigger, state, style, transition, animate,
  AfterViewChecked, AfterViewInit, OnInit, SimpleChanges, ChangeDetectionStrategy, ChangeDetectorRef, group, keyframes
} from "@angular/core";
import {SELECTOR_PREFIX} from "../feedback.const";
import {
  CharacterTypeEnum, CharacterSentimentEnum,
  CharacterSentimentWithDescription
} from "../../classes/character.class";
import {WindowRefService} from "../../services/window-ref.service";
import {Store} from "@ngrx/store";
import {ComponentVisibilityState} from "../../state-storage/component-visibility.reducer";

const CARD_SCENE_CLASS_BASE = "feedback-playing-card-";

const BACKGROUND_SCENE_MAP = {
  danger: CARD_SCENE_CLASS_BASE + "danger",
  sad: CARD_SCENE_CLASS_BASE + "sad",
  happy: CARD_SCENE_CLASS_BASE + "happy",
  exciting: CARD_SCENE_CLASS_BASE + "exciting",
};

interface ComponentVisibility {
  componentVisibilityStates: ComponentVisibilityState[];
}

@Component({
  selector: SELECTOR_PREFIX + "playing-card",
  templateUrl: "./playing-card.component.html",
  styleUrls: ["./playing-card.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger("flyInOut", [
      state("in", style({transform: "translateX(0)", opacity: 1})),
      state("out", style({transform: "translateX(-50px)", opacity: 0})),
      transition("out => in", [
        animate(300, keyframes([
          style({opacity: 0, transform: 'translateX(-100%)', offset: 0}),
          style({opacity: 1, transform: 'translateX(15px)', offset: 0.3}),
          style({opacity: 1, transform: 'translateX(0)', offset: 1.0})
        ]))
      ])
    ])
  ]
})

export class PlayingCardComponent implements OnInit {

  height: number;

  sceneClass: string;
  state: string;

  isVisible: boolean;

  @Input() animateDelay: number;
  @Input() characterDescription: CharacterSentimentWithDescription;

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private elementRef: ElementRef,
              private windowRef: WindowRefService) {
    this.isVisible = false;
  }

  @HostListener("window:scroll", ["$event"])
  onScroll(event) {
    this.setVisible();
  }

  ngOnInit(): void {
    this.setScene();
    this.setVisible();
  }

  private setVisible(): void {
    if (this.animateDelay == null) {
      this.animateDelay = 100;
    }

    if (this.isElementInViewport(this.elementRef.nativeElement, this.windowRef.nativeWindow)) {
      setTimeout(() => {
        this.isVisible = true;
        this.changeDetectorRef.markForCheck();
      }, this.animateDelay);
    }

  }

  private setScene(): void {
    this.sceneClass = BACKGROUND_SCENE_MAP[this.characterDescription.characterSentiment.sentimentType];
  }

  private isElementInViewport(el: HTMLElement, window: Window): boolean {

    let top = el.offsetTop;
    let height = el.offsetHeight;

    while (el.offsetParent) {
      el = <HTMLElement>el.offsetParent;
      top += el.offsetTop;
    }

    return (
      (window.pageYOffset <= top + height && top <= window.pageYOffset + window.innerHeight - 250)
    );
  }

}
