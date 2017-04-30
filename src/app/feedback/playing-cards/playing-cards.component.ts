import {Component} from "@angular/core";
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

const USER_INFO_PATH = "/user-info";

@Component({
  selector: SELECTOR_PREFIX + "playing-cards",
  templateUrl: "./playing-cards.component.html",
  styleUrls: ["./playing-cards.component.scss"]
})

export class PlayingCardsComponent {

  readonly ColorNamesMap: [string, string][] = [
    ["ch-red", "#FF6384"],
    ["ch-blue", "#36A2EB"],
    ["ch-yellow", "#FFCE56"],
    ["ch-lilac", "#9c27b0"],
    ["ch-green", "#8bc34a"],
    ["ch-grey", "#999999"]
  ];

  readonly colorClasses: string[];
  readonly textAnimation: AnimateActionEnum = AnimateActionEnum.FadeInDown;
  readonly cardsAnimation: AnimateActionEnum = AnimateActionEnum.FadeInLeft;
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

  caloriesChartData: PieChardData[];
  sugarChartData: PieChardData[];
  satFatChartData: PieChardData[];

  nutrientTypeIdEnergy: NutrientTypeIdEnum = NutrientTypeIdEnum.Energy;
  nutrientTypeIdSugar: NutrientTypeIdEnum = NutrientTypeIdEnum.Sugar;
  nutrientTypeIdSatFat: NutrientTypeIdEnum = NutrientTypeIdEnum.SatdFat;

  tellMeMoreVisible: boolean = false;
  tellMeMoreDetails: PlayingCardDetails[];
  daysRecorded: number;

  diets: any = [
    {
      src: "/assets/img/salmon-pic.jpg",
      title: "Salmon",
      howMany: "At least 2 portions a week. Portion is around 140g.",
      sourceOf: ["healthy fats", "protein", "Vitamin D"]
    },

    {
      src: "/assets/img/egg-pic.jpg",
      title: "Eggs",
      howMany: "No more than 3 whole eggs a day",
      sourceOf: ["healthy fats", "protein"]
    },

    {
      src: "/assets/img/blue-pic.jpg",
      title: "Blueberries",
      howMany: "50g a day",
      sourceOf: ["Vitamin B", "Vitamin E"]
    },
  ];

  constructor(private router: Router,
              private dictionariesService: DictionariesService,
              private userDemographicService: UserDemographicService) {
    this.colorClasses = this.ColorNamesMap.map(cn => cn[0]);
  }

  ngOnInit(): void {

    Observable.forkJoin(
      this.dictionariesService.get(),
      this.userDemographicService.getUserDemographic()
    ).subscribe(res => this.buildView(res));

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

  private buildView(dictionariesRes: [Dictionaries, Option<UserDemographic>]): void {

    let surveyResult = dictionariesRes[0].surveyResult;

    if (surveyResult.surveySubmissions.length == 0) {
      location.href = AppConfig.surveyPath;
      return;
    }

    this.daysRecorded = surveyResult.surveySubmissions.length;

    let foods: Food[] = surveyResult.getReducedFoods();
    dictionariesRes[1].match({
      some: ud => {
        this.userDemographic = ud;
        this.buildCHaracterCards(foods, dictionariesRes[0].characterRules);
        this.getTopFoods(foods);
        this.isLoading = false;
      },
      none: () => {
        this.router.navigate([USER_INFO_PATH]);
      }
    })
  }

  private buildCHaracterCards(foods: Food[], characterRules: CharacterRules[]): void {
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

    let foodHighInCalories = this.sortFoodByNutrientTypeId(NutrientTypeIdEnum.Energy, foods);
    let foodHighInSugar = this.sortFoodByNutrientTypeId(NutrientTypeIdEnum.Sugar, foods);
    let foodHighInSatFat = this.sortFoodByNutrientTypeId(NutrientTypeIdEnum.SatdFat, foods);

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
  }

  private sortFoodByNutrientTypeId(nutrientTypeId: number, foods: Food[]): Food[] {
    return foods.map(food => food.clone())
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

}
