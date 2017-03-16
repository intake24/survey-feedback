import {Component} from "@angular/core";
import {SELECTOR_PREFIX} from "../feedback.const";
import {Observable} from "rxjs";
import {CharacterSentimentWithDescription} from "../../classes/character.class";
import {UserDemographic} from "../../classes/demographic-group.class";
import {Food} from "../../classes/food.class";
import {NutrientTypeIdEnum, DictionariesService, Dictionaries} from "../../services/dictionaries.service";
import {UserDemographicService} from "../../services/user-demographic.service";

@Component({
    selector: SELECTOR_PREFIX + "playing-cards",
    templateUrl: "./playing-cards.component.html",
    styleUrls: ["./playing-cards.component.scss"]
})

export class PlayingCardsComponent {

    results: CharacterSentimentWithDescription[] = [];
    userDemographic: UserDemographic;
    foodHighInCalories: Food[] = [];
    foodHighInSugar: Food[] = [];
    foodHighInSatFat: Food[] = [];

    nutrientTypeIdEnergy: NutrientTypeIdEnum = NutrientTypeIdEnum.ENERGEY;
    nutrientTypeIdSugar: NutrientTypeIdEnum = NutrientTypeIdEnum.SUGAR;
    nutrientTypeIdSatFat: NutrientTypeIdEnum = NutrientTypeIdEnum.SATD_FAT;

    showTopNumber: number = 5;

    public doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
    public doughnutChartData: number[] = [350, 450, 100];
    public doughnutChartType: string = 'doughnut';

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

    constructor(private dictionariesService: DictionariesService,
                private userDemographicService: UserDemographicService) {
    }

    ngOnInit(): void {


        Observable.forkJoin(
            this.dictionariesService.get(),
            this.userDemographicService.getUserDemographic()
        ).subscribe(res => this.buildView(res));

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

    private buildView(dictionariesRes: [Dictionaries, UserDemographic]): void {
        this.buildCHaracterCards(dictionariesRes);
        this.getTopFoods(dictionariesRes[0].surveyResults);
    }

    private buildCHaracterCards(dictionariesRes: [Dictionaries, UserDemographic]): void {
        let dictionaries = dictionariesRes[0];
        let foods = dictionaries.surveyResults;
        let characterRules = dictionaries.characterRules;
        this.userDemographic = dictionariesRes[1];
        this.results = characterRules.map(characterRule => {
            let sentiment = characterRule.getSentiment(this.userDemographic, foods);
            return sentiment.get;
        });
    }

    private getTopFoods(foods: Food[]): void {
        this.foodHighInCalories = this.getTopFoodByNutrientTypeId(NutrientTypeIdEnum.ENERGEY, foods);
        this.foodHighInSugar = this.getTopFoodByNutrientTypeId(NutrientTypeIdEnum.SUGAR, foods);
        this.foodHighInSatFat = this.getTopFoodByNutrientTypeId(NutrientTypeIdEnum.SATD_FAT, foods);
        console.log(this.foodHighInSugar);
    }

    private getTopFoodByNutrientTypeId(nutrientTypeId: number, foods: Food[]): Food[] {
        return foods.map(food => food.clone())
            .sort((a, b) => b.getConsumption(nutrientTypeId) - a.getConsumption(nutrientTypeId))
            .slice(0, this.showTopNumber);
    }

}
