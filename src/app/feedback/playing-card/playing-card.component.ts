import {
  Component, Input, ElementRef, HostListener,
  OnInit, ChangeDetectionStrategy, ChangeDetectorRef
} from "@angular/core";
import {SELECTOR_PREFIX} from "../feedback.const";
import {
  CharacterSentimentWithDescription
} from "../../classes/character.class";
import {WindowRefService} from "../../services/window-ref.service";

const CARD_SCENE_CLASS_BASE = "feedback-playing-card-";

const BACKGROUND_SCENE_MAP = {
  danger: CARD_SCENE_CLASS_BASE + "danger",
  sad: CARD_SCENE_CLASS_BASE + "sad",
  happy: CARD_SCENE_CLASS_BASE + "happy",
  exciting: CARD_SCENE_CLASS_BASE + "exciting",
};

@Component({
  selector: SELECTOR_PREFIX + "playing-card",
  templateUrl: "./playing-card.component.html",
  styleUrls: ["./playing-card.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PlayingCardComponent implements OnInit {

  height: number;

  sceneClass: string;
  state: string;

  isVisible: boolean;

  @Input() characterDescription: CharacterSentimentWithDescription;

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private elementRef: ElementRef,
              private windowRef: WindowRefService) {
    this.isVisible = false;
  }

  ngOnInit(): void {
    this.setScene();
  }

  private setScene(): void {
    this.sceneClass = BACKGROUND_SCENE_MAP[this.characterDescription.characterSentiment.sentimentType];
  }

}
