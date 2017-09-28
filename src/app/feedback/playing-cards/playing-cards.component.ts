import {Component, OnChanges, OnInit} from "@angular/core";
import {SELECTOR_PREFIX} from "../feedback.const";
import {Observable} from "rxjs";
import {CharacterSentimentWithDescription, CharacterRules} from "../../classes/character.class";
import {Food} from "../../classes/survey-result.class";
import {NutrientTypeIdEnum, DictionariesService, Dictionaries} from "../../services/dictionaries.service";
import {UserDemographicService} from "../../services/user-demographic.service";
import {PieChardData} from "../pie-chart/pie-chart.component";
import {AnimateActionEnum} from "../../../animations/animate-action.enum";
import {PlayingCardDetails} from "../playing-card/playing-card.component";
import {Option, none, some} from "ts-option";
import {Router} from "@angular/router";
import {AppConfig} from "../../conf";
import {UserDemographic} from "../../classes/user-demographic.class";
import {SurveyFeedbackStyleEnum} from "../../classes/survey-feedback-style.enum";
import {SurveysService} from "../../services/surveys.service";

const USER_INFO_PATH = "/user-info";

@Component({
  selector: SELECTOR_PREFIX + "playing-cards",
  templateUrl: "./playing-cards.component.html",
  styleUrls: ["./playing-cards.component.scss"]
})

export class PlayingCardsComponent implements OnInit, OnChanges {

  readonly ColorNamesMap: [string, string][] = [
    ["ch-red", "#FF6384"],
    ["ch-blue", "#36A2EB"],
    ["ch-yellow", "#FFCE56"],
    ["ch-lilac", "#9c27b0"],
    ["ch-green", "#8bc34a"],
    ["ch-grey", "#999999"]
  ];

  readonly colorClasses: string[];
  readonly textAnimation: AnimateActionEnum = AnimateActionEnum.BounceInDown;
  readonly cardsAnimation: AnimateActionEnum = AnimateActionEnum.BounceInLeft;
  readonly buttonsAnimation: AnimateActionEnum = AnimateActionEnum.ZoomIn;
  readonly surveyPath: string = AppConfig.surveyPath;
  readonly showTopNumber: number = 5;

  isLoading: boolean = true;

  results: CharacterSentimentWithDescription[];
  resultsInThreeCols: CharacterSentimentWithDescription[][] = [];
  resultsInTwoCols: CharacterSentimentWithDescription[][] = [];
  resultsInOneCols: CharacterSentimentWithDescription[][] = [];
  userDemographic: UserDemographic;
  foodHighInCalories: Food[] = [];
  foodHighInSugar: Food[] = [];
  foodHighInSatFat: Food[] = [];

  totalCalorieIntake: number;
  totalSugarIntake: number;
  totalSatFatIntake: number;

  caloriesChartData: PieChardData[];
  sugarChartData: PieChardData[];
  satFatChartData: PieChardData[];

  nutrientTypeIdEnergy: NutrientTypeIdEnum = NutrientTypeIdEnum.Energy;
  nutrientTypeIdSugar: NutrientTypeIdEnum = NutrientTypeIdEnum.Sugar;
  nutrientTypeIdSatFat: NutrientTypeIdEnum = NutrientTypeIdEnum.SatdFat;

  tellMeMoreVisible: boolean = false;
  tellMeMoreDetails: PlayingCardDetails[];
  daysRecorded: number;
  currentDay: number;

  feedbackStyle: SurveyFeedbackStyleEnum;

  private cachedDictionariesRes: [Dictionaries, Option<UserDemographic>];

  constructor(private router: Router,
              private dictionariesService: DictionariesService,
              private userDemographicService: UserDemographicService) {
    this.colorClasses = this.ColorNamesMap.map(cn => cn[0]);
  }

  ngOnInit(): void {

    Observable.forkJoin(
      this.dictionariesService.get(),
      this.userDemographicService.getUserDemographic()
    ).subscribe(res => {
      this.cachedDictionariesRes = res;
      this.buildView();
    });

  }

  ngOnChanges(): void {
    console.log(this.currentDay);
  }

  onTellMeMore(playingCardDetails: PlayingCardDetails[]): void {
    this.tellMeMoreVisible = true;
    this.tellMeMoreDetails = playingCardDetails;
  }

  getByColumns(colsCount: number): CharacterSentimentWithDescription[][] {
    let result = [];
    let colIndex = 0;
    while (colIndex < colsCount) {
      result.push(this.results.filter((r, i) => i % colsCount == colIndex));
      colIndex++;
    }
    return result;
  }

  buildView($event?: number): void {
    this.currentDay = $event;
    this.feedbackStyle = this.cachedDictionariesRes[0].surveyFeedbackStyle;

    let dictionariesRes = this.cachedDictionariesRes;
    let surveyResult = dictionariesRes[0].surveyResult;

    if (surveyResult.surveySubmissions.length == 0) {
      location.href = AppConfig.surveyPath;
      return;
    }

    this.daysRecorded = surveyResult.surveySubmissions.length;

    let foods: Food[] = surveyResult.getReducedFoods(this.currentDay);
    dictionariesRes[1].match({
      some: ud => {
        this.userDemographic = ud;
        this.buildCharacterCards(foods, dictionariesRes[0].characterRules);
        this.getTopFoods(foods);
        this.isLoading = false;
      },
      none: () => {
        this.router.navigate([USER_INFO_PATH]);
      }
    })
  }

  private buildCharacterCards(foods: Food[], characterRules: CharacterRules[]): void {
    this.results = characterRules.map(characterRule =>
      characterRule.getSentiment(this.userDemographic, foods).match({
        some: sent => some(sent),
        none: () => {
          console.warn("Sentiment for character",
            characterRule.type, "nutrientTypeIds",
            characterRule.nutrientTypeIds,
            "resulted empty. Demographic groups",
            characterRule.demographicGroups);
          return none;
        }
      })
    ).filter(sentiment => sentiment.isDefined).map(sentiment => sentiment.get);
    this.resultsInThreeCols = this.getByColumns(3);
    this.resultsInTwoCols = this.getByColumns(2);
    this.resultsInOneCols = this.getByColumns(1);
  }

  private getTopFoods(foods: Food[]): void {

    let foodHighInCalories = this.filterAndSortFoodByNutrientTypeId(NutrientTypeIdEnum.Energy, foods);
    let foodHighInSugar = this.filterAndSortFoodByNutrientTypeId(NutrientTypeIdEnum.Sugar, foods);
    let foodHighInSatFat = this.filterAndSortFoodByNutrientTypeId(NutrientTypeIdEnum.SatdFat, foods);

    let otherCalories = foodHighInCalories.slice(this.showTopNumber);
    let otherSugar = foodHighInSugar.slice(this.showTopNumber);
    let otherSatdFat = foodHighInSatFat.slice(this.showTopNumber);

    this.foodHighInCalories = foodHighInCalories.slice(0, this.showTopNumber).concat(this.summeriseOtherFood(NutrientTypeIdEnum.Energy, otherCalories));
    this.foodHighInSugar = foodHighInSugar.slice(0, this.showTopNumber).concat(this.summeriseOtherFood(NutrientTypeIdEnum.Sugar, otherSugar));
    this.foodHighInSatFat = foodHighInSatFat.slice(0, this.showTopNumber).concat(this.summeriseOtherFood(NutrientTypeIdEnum.SatdFat, otherSatdFat));

    this.caloriesChartData = this.foodHighInCalories
      .map((f, i) => new PieChardData(f.getConsumption(NutrientTypeIdEnum.Energy), f.englishName, this.ColorNamesMap[i][1]));

    this.sugarChartData = this.foodHighInSugar
      .map((f, i) => new PieChardData(f.getConsumption(NutrientTypeIdEnum.Sugar), f.englishName, this.ColorNamesMap[i][1]));

    this.satFatChartData = this.foodHighInSatFat
      .map((f, i) => new PieChardData(f.getConsumption(NutrientTypeIdEnum.SatdFat), f.englishName, this.ColorNamesMap[i][1]));

    this.getTotalFoodConsumptions(foods);
  }

  private filterAndSortFoodByNutrientTypeId(nutrientTypeId: number, foods: Food[]): Food[] {
    return foods.map(food => food.clone())
      .filter(f => f.getConsumption(nutrientTypeId) > 0)
      .sort((a, b) => b.getConsumption(nutrientTypeId) - a.getConsumption(nutrientTypeId));
  }

  private summeriseOtherFood(nutrientTypeId: number, foods: Food[]): Food[] {
    if (!foods.length) {
      return [];
    } else {
      let total = foods.map(f => f.getConsumption(nutrientTypeId)).reduce((a, b) => a + b);
      return [new Food("other", "Other food", "Other food", new Map([[nutrientTypeId, total]]))];
    }
  }

  private getTotalFoodConsumptions(foods: Food[]): void {
    this.totalCalorieIntake = foods.map(f => f.getEnergy()).reduce((a, b) => a + b, 0);
    this.totalSugarIntake = foods.map(f => f.getConsumption(NutrientTypeIdEnum.Sugar)).reduce((a, b) => a + b, 0);
    this.totalSatFatIntake = foods.map(f => f.getConsumption(NutrientTypeIdEnum.SatdFat)).reduce((a, b) => a + b, 0);

    this.totalCalorieIntake = Math.round(this.totalCalorieIntake * 10) / 10;
    this.totalSugarIntake = Math.round(this.totalSugarIntake * 10) / 10;
    this.totalSatFatIntake = Math.round(this.totalSatFatIntake * 10) / 10;
  }

}
