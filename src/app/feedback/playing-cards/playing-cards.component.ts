import {Component, OnChanges, OnInit} from "@angular/core";
import {SELECTOR_PREFIX} from "../feedback.const";
import {forkJoin} from "rxjs";
import {CharacterRules, CharacterCardParameters} from "../../classes/character.class";
import {AggregateFoodStats, Food, FruitAndVegPortions} from "../../classes/survey-result.class";
import {Dictionaries, DictionariesService, NutrientTypeIdEnum} from "../../services/dictionaries.service";
import {UserDemographicService} from "../../services/user-demographic.service";
import {PieChardData} from "../pie-chart/pie-chart.component";
import {PlayingCardDetails} from "../character-card/character-card.component";
import {none, Option, some} from "ts-option";
import {Router} from "@angular/router";
import {AppConfig} from "../../conf";
import {UserDemographic} from "../../classes/user-demographic.class";
import {SurveyFeedbackStyleEnum} from "../../classes/survey-feedback-style.enum";
import {AnimateActionEnum} from "../../../animate-ts/animate-action.enum";
import {FiveADayCardParameters} from "../five-a-day-card/five-a-day.component";
import {FiveADayFeedback} from "../../classes/five-a-day-feedback";
import {FoodGroupCardParameters} from "../food-group-card/food-group-card.component";
import {FoodGroupFeedback} from "../../classes/food-group-feedback";
import {DemographicRange, DemographicScaleSectorSentimentEnum} from "../../classes/demographic-group.class";

const USER_INFO_PATH = "/user-info";

export type FeedbackCardParameters = CharacterCardParameters | FiveADayCardParameters | FoodGroupCardParameters;

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
  readonly textAnimation = AnimateActionEnum.BounceInDown;
  readonly cardsAnimation = AnimateActionEnum.BounceInLeft;
  readonly buttonsAnimation = AnimateActionEnum.ZoomIn;
  readonly surveyPath: string = AppConfig.surveyPath;
  readonly showTopNumber: number = 5;

  isLoading: boolean = true;

  results: FeedbackCardParameters[];
  resultsInThreeCols: FeedbackCardParameters[][] = [];
  resultsInTwoCols: FeedbackCardParameters[][] = [];
  resultsInOneCols: FeedbackCardParameters[][] = [];
  userDemographic: UserDemographic;
  foodHighInCalories: AggregateFoodStats[] = [];
  foodHighInSugar: AggregateFoodStats[] = [];
  foodHighInSatFat: AggregateFoodStats[] = [];

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
  followUpUrl?: string;

  private cachedDictionariesRes: [Dictionaries, Option<UserDemographic>];

  constructor(private router: Router,
              private dictionariesService: DictionariesService,
              private userDemographicService: UserDemographicService) {
    this.colorClasses = this.ColorNamesMap.map(cn => cn[0]);
  }

  ngOnInit(): void {

    forkJoin(
      this.dictionariesService.get(),
      this.userDemographicService.getUserDemographic(),
    ).subscribe(res => {
      this.cachedDictionariesRes = res;
      this.buildView();
    });

  }

  ngOnChanges(): void {
  }

  onTellMeMore(playingCardDetails: PlayingCardDetails[]): void {
    this.tellMeMoreVisible = true;
    this.tellMeMoreDetails = playingCardDetails;
  }

  getByColumns(colsCount: number): CharacterCardParameters[][] {
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

    let foods = surveyResult.getReducedFoods(this.currentDay);
    let foodGroups = surveyResult.getFoodGroupAverages(this.currentDay);
    let fruitAndVegPortions = surveyResult.getFruitAndVegPortions(this.currentDay);

    this.followUpUrl = dictionariesRes[0].followUpUrl;

    dictionariesRes[1].match({
      some: ud => {
        this.userDemographic = ud;
        this.buildFeedbackCards(foods, foodGroups, fruitAndVegPortions, dictionariesRes[0].characterRules, dictionariesRes[0].fiveADayFeedback, dictionariesRes[0].foodGroupsFeedback);
        this.getTopFoods(foods);
        this.isLoading = false;
      },
      none: () => {
        this.router.navigate([USER_INFO_PATH]);
      }
    })
  }

  private buildFoodGroupFeedbackCards(foodGroupsFeedback: FoodGroupFeedback[], foodGroupAverages: Map<number, number>): FoodGroupCardParameters[] {
    return foodGroupsFeedback.map(feedback => {

      let groupIntake = feedback.foodGroupIds.reduce((total, groupId) => {
        if (foodGroupAverages.has(groupId))
          return total + foodGroupAverages.get(groupId);
        else
          return total;
      }, 0);


      let lowerCaseName = feedback.groupName.toLowerCase();
      let capitalisedName = feedback.groupName.charAt(0).toUpperCase() + feedback.groupName.substr(1);

      let warning = undefined;

      if (feedback.low && groupIntake < feedback.low.threshold)
        warning = feedback.low.message;
      else if (feedback.high && groupIntake > feedback.high.threshold)
        warning = feedback.high.message;

      let details = new PlayingCardDetails(`${capitalisedName} intake`, groupIntake, feedback.tellMeMore, feedback.recommendedIntake,
        "g", undefined, DemographicScaleSectorSentimentEnum.GOOD, warning);

      return new FoodGroupCardParameters(feedback.groupName, groupIntake, FoodGroupFeedback.getBackgroundClassForFoodGroup(feedback.foodGroupIds), details);

    });
  }

  private buildFeedbackCards(foods: AggregateFoodStats[], foodGroupAverages: Map<number, number>,
                             fruitAndVegAverages: FruitAndVegPortions, characterRules: CharacterRules[],
                             fiveADayFeedback: FiveADayFeedback, foodGroupsFeedback: FoodGroupFeedback[]): void {
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

    this.results.push(new FiveADayCardParameters(Math.round(fruitAndVegAverages.total * 10) / 10, fiveADayFeedback));

    this.results.push.apply(this.results, this.buildFoodGroupFeedbackCards(foodGroupsFeedback, foodGroupAverages));

    this.resultsInThreeCols = this.getByColumns(3);
    this.resultsInTwoCols = this.getByColumns(2);
    this.resultsInOneCols = this.getByColumns(1);
  }

  private getTopFoods(foods: AggregateFoodStats[]): void {

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
      .map((f, i) => new PieChardData(f.getAverageIntake(NutrientTypeIdEnum.Energy), f.name, this.ColorNamesMap[i][1]));

    this.sugarChartData = this.foodHighInSugar
      .map((f, i) => new PieChardData(f.getAverageIntake(NutrientTypeIdEnum.Sugar), f.name, this.ColorNamesMap[i][1]));

    this.satFatChartData = this.foodHighInSatFat
      .map((f, i) => new PieChardData(f.getAverageIntake(NutrientTypeIdEnum.SatdFat), f.name, this.ColorNamesMap[i][1]));

    this.getTotalFoodConsumptions(foods);
  }

  private filterAndSortFoodByNutrientTypeId(nutrientTypeId: number, foods: AggregateFoodStats[]): AggregateFoodStats[] {
    return foods.map(food => food.clone())
      .filter(f => f.getAverageIntake(nutrientTypeId) > 0)
      .sort((a, b) => b.getAverageIntake(nutrientTypeId) - a.getAverageIntake(nutrientTypeId));
  }

  private summeriseOtherFood(nutrientTypeId: number, foods: AggregateFoodStats[]): AggregateFoodStats[] {
    if (!foods.length) {
      return [];
    } else {
      let total = foods.map(f => f.getAverageIntake(nutrientTypeId)).reduce((a, b) => a + b);
      return [new AggregateFoodStats("Other food", new Map([[nutrientTypeId, total]]))];
    }
  }

  private getTotalFoodConsumptions(foods: AggregateFoodStats[]): void {
    this.totalCalorieIntake = foods.map(f => f.getAverageEnergyIntake()).reduce((a, b) => a + b, 0);
    this.totalSugarIntake = foods.map(f => f.getAverageIntake(NutrientTypeIdEnum.Sugar)).reduce((a, b) => a + b, 0);
    this.totalSatFatIntake = foods.map(f => f.getAverageIntake(NutrientTypeIdEnum.SatdFat)).reduce((a, b) => a + b, 0);

    this.totalCalorieIntake = Math.round(this.totalCalorieIntake * 10) / 10;
    this.totalSugarIntake = Math.round(this.totalSugarIntake * 10) / 10;
    this.totalSatFatIntake = Math.round(this.totalSatFatIntake * 10) / 10;
  }

}
