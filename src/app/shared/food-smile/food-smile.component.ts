import {Component, Input, OnChanges} from '@angular/core';
import {CharacterSentimentEnum, CharacterTypeEnum} from '../../classes/character.class';

const CHARACTER_ICON_CLASS_BASE = 'food-smile-';

@Component({
  selector: 'food-smile',
  templateUrl: 'food-smile.component.html',
  styleUrls: ['food-smile.component.scss']
})

export class FoodSmileComponent implements OnChanges {

  iconClasses: string[];

  @Input() character: CharacterTypeEnum;
  @Input() scene: CharacterSentimentEnum;

  ngOnChanges(): void {
    this.setScene();
  }

  private setScene(): void {
    this.iconClasses = [CHARACTER_ICON_CLASS_BASE + this.character, CHARACTER_ICON_CLASS_BASE + this.scene];
  }

}
