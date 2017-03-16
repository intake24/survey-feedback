import {Component, Input, HostListener, ElementRef} from "@angular/core";
import {SELECTOR_PREFIX} from "../feedback.const";
import {CharacterTypeEnum, CharacterSentimentEnum} from "../../classes/character.class";

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
    styleUrls: ["./playing-card.component.scss"]
})

export class PlayingCardComponent {

    private ELEMENTS_IN_COL: number = 3;
    private ASPECT_RATIO: number = 16 / 9;

    height: number;

    sceneClass: string;
    iconClasses: string[];

    @Input() character: CharacterTypeEnum;
    @Input() scene: CharacterSentimentEnum;
    @Input() title: string;
    @Input() descriptions: string[];

    constructor(private elementRef: ElementRef) {

    }

    @HostListener("window:resize", ["$event"])
    onResize(event) {
        this.setSize();
    }

    ngOnInit(): void {
        this.setScene();
        this.setSize();
    }

    private setSize(): void {
        this.height = this.elementRef.nativeElement.offsetWidth / this.ASPECT_RATIO;
    }

    private setScene(): void {
        this.sceneClass = BACKGROUND_SCENE_MAP[this.scene];
    }

}
