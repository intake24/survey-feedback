import {Component, Input} from "@angular/core";
import {CharacterTypeEnum, CharacterSentimentEnum} from "../../classes/character.class";

const CHARACTER_ICON_CLASS_BASE: string = "food-smile-";

@Component({
  selector: "food-smile",
  templateUrl: "./food-smile.component.html",
  styleUrls: ["./food-smile.component.scss"]
})

export class FoodSmileComponent {

  iconClasses: string[];

  @Input() character: CharacterTypeEnum;
  @Input() scene: CharacterSentimentEnum;

  ngOnInit(): void {
    this.setScene();
  }

  private setScene(): void {
    this.iconClasses = [CHARACTER_ICON_CLASS_BASE + this.character, CHARACTER_ICON_CLASS_BASE + this.scene];
  }

}
