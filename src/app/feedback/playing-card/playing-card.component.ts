import {
  Component, Input,
  OnInit, ChangeDetectionStrategy
} from "@angular/core";
import {SELECTOR_PREFIX} from "../feedback.const";
import {
  CharacterSentimentWithDescription
} from "../../classes/character.class";
import {NutrientTypesService} from "../../services/nutrient-types.service";

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

  constructor(private nutrientService: NutrientTypesService) {
    this.isVisible = false;
  }

  ngOnInit(): void {
    this.setScene();
  }

  getResultedDemographicTitle(): Subtitle[] {
    return this.characterDescription.demographicResults
      .map(dr => {
        let title = dr.resultedDemographicGroup.scaleSectors[0].name;
        let consumption = dr.consumption;
        let nutrientId = dr.resultedDemographicGroup.nutrientTypeId;
        return new Subtitle(title, consumption, this.nutrientService.getUnitByNutrientTypeId(nutrientId).get);
      });
  }

  private setScene(): void {
    this.sceneClass = BACKGROUND_SCENE_MAP[this.characterDescription.characterSentiment.sentimentType];
  }

}

class Subtitle {

  readonly title: string;
  readonly consumption: number;
  readonly units: string;

  constructor(title: string, consumption: number, units: string) {
    this.title = title;
    this.consumption = Math.round(consumption * 100) / 100;
    this.units = units;
  }
}
