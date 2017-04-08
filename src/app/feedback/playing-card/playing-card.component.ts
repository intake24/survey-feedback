import {
  Component, Input,
  OnInit, ChangeDetectionStrategy, Output, EventEmitter
} from "@angular/core";
import {SELECTOR_PREFIX} from "../feedback.const";
import {
  CharacterSentimentWithDescription
} from "../../classes/character.class";
import {NutrientTypesService} from "../../services/nutrient-types.service";
import {DemographicRange, DemographicScaleSectorSentimentEnum} from "../../classes/demographic-group.class";

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

  isVisible: boolean;

  sentimentEnums: Object;

  @Output() onTellMeMore: EventEmitter<PlayingCardDetails[]>;

  @Input() characterDescription: CharacterSentimentWithDescription;

  constructor(private nutrientService: NutrientTypesService) {
    this.isVisible = false;
    this.sentimentEnums = DemographicScaleSectorSentimentEnum;
    this.onTellMeMore = new EventEmitter();
  }

  ngOnInit(): void {
    this.setScene();
  }

  tellMeMore(): void {
    this.onTellMeMore.emit(this.getResultedDemographicTitle());
  }

  getResultedDemographicTitle(): PlayingCardDetails[] {
    return this.characterDescription.demographicResults
      .map(dr => {
        let title = dr.resultedDemographicGroup.scaleSectors[0].name;
        let consumption = dr.consumption;
        let sentiment = dr.resultedDemographicGroup.scaleSectors[0].sentiment;
        let targetConsumption = dr.targetDemographicGroup.scaleSectors[0].range;
        let description = dr.resultedDemographicGroup.scaleSectors[0].description.get;
        let nutrientId = dr.resultedDemographicGroup.nutrientTypeId;
        return new PlayingCardDetails(title, consumption, description, targetConsumption,
          this.nutrientService.getUnitByNutrientTypeId(nutrientId).get, sentiment);
      });
  }

  private setScene(): void {
    this.sceneClass = BACKGROUND_SCENE_MAP[this.characterDescription.characterSentiment.sentimentType];
  }

}

export class PlayingCardDetails {

  readonly title: string;
  readonly consumption: number;
  readonly description: string;
  readonly targetConsumption: DemographicRange;
  readonly units: string;
  readonly sentiment: DemographicScaleSectorSentimentEnum;
  readonly textClass: string;
  readonly iconClass: string;

  constructor(title: string, consumption: number, description: string, targetConsumption: DemographicRange,
              units: string, sentiment: DemographicScaleSectorSentimentEnum) {
    this.title = title;
    this.consumption = Math.round(consumption * 100) / 100;
    this.description = description;
    this.targetConsumption = new DemographicRange(Math.round(targetConsumption.start * 100) / 100,
      Math.round(targetConsumption.end * 100) / 100);
    this.units = units;
    this.sentiment = sentiment;
    this.textClass = this.getTextClass(sentiment);
    this.iconClass = this.getIconClass(sentiment);
  }

  private getTextClass(sentiment: DemographicScaleSectorSentimentEnum): string {
    if ([DemographicScaleSectorSentimentEnum.TOO_LOW,
        DemographicScaleSectorSentimentEnum.LOW,
        DemographicScaleSectorSentimentEnum.HIGH,
        DemographicScaleSectorSentimentEnum.TOO_HIGH,].indexOf(sentiment) > -1) {
      return "text-danger";
    } else if ([DemographicScaleSectorSentimentEnum.BIT_LOW,
        DemographicScaleSectorSentimentEnum.BIT_HIGH].indexOf(sentiment) > -1) {
      return "text-warning";
    } else {
      return "text-success";
    }
  }

  private getIconClass(sentiment: DemographicScaleSectorSentimentEnum): string {
    let mp = new Map([
      [DemographicScaleSectorSentimentEnum.TOO_LOW, "fa-angle-double-down"],
      [DemographicScaleSectorSentimentEnum.LOW, "fa-angle-double-down"],
      [DemographicScaleSectorSentimentEnum.BIT_LOW, "fa-angle-down"],
      [DemographicScaleSectorSentimentEnum.GOOD, "fa-crosshairs"],
      [DemographicScaleSectorSentimentEnum.EXCELLENT, "fa-crosshairs"],
      [DemographicScaleSectorSentimentEnum.BIT_HIGH, "fa-angle-up"],
      [DemographicScaleSectorSentimentEnum.HIGH, "fa-angle-double-up"],
      [DemographicScaleSectorSentimentEnum.TOO_HIGH, "fa-angle-double-up"],
    ]);
    return mp.get(sentiment);
  }

}
