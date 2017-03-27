import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Option, none, some} from "ts-option";
import {
  CharacterTypeEnum, CharacterBuilder, CharacterSentimentEnum,
  CharacterSentiment, CharacterRules
} from "../classes/character.class";
import {DemographicScaleSectorSentimentEnum, DemographicGroup} from "../classes/demographic-group.class";
import {MySurveyResultsService} from "./my-survey-results.service";
import {DemographicGroupsService} from "./demographic-groups.service";
import {NutrientTypesService} from "./nutrient-types.service";
import {Food, SurveySubmission} from "../classes/food.class";
import {NutrientType} from "../classes/nutrient-types.class";


export enum NutrientTypeIdEnum {
    ENERGEY = <number>1,
    SUGAR = <number>23,
    SATD_FAT = <number>50
}


const CharacterBuilders = [
    new CharacterBuilder(CharacterTypeEnum.BATTERY, [NutrientTypeIdEnum.ENERGEY], [
        new CharacterSentiment(
            [DemographicScaleSectorSentimentEnum.TOO_LOW, DemographicScaleSectorSentimentEnum.LOW],
            CharacterSentimentEnum.DANGER,
            "You need to charge yourself"),
        new CharacterSentiment(
            [DemographicScaleSectorSentimentEnum.BIT_LOW],
            CharacterSentimentEnum.WARNING,
            "Big things require more energy"),
        new CharacterSentiment(
            [DemographicScaleSectorSentimentEnum.GOOD, DemographicScaleSectorSentimentEnum.EXCELLENT],
            CharacterSentimentEnum.EXCITING,
            "Your're so energetic"),
        new CharacterSentiment(
            [DemographicScaleSectorSentimentEnum.BIT_HIGH],
            CharacterSentimentEnum.WARNING,
            "You don't eat that much of energy"),
        new CharacterSentiment(
            [DemographicScaleSectorSentimentEnum.HIGH, DemographicScaleSectorSentimentEnum.TOO_HIGH],
            CharacterSentimentEnum.DANGER,
            "That's an overload")
    ]),

    new CharacterBuilder(CharacterTypeEnum.BREAD, [13, 17], [
        new CharacterSentiment(
            [DemographicScaleSectorSentimentEnum.TOO_LOW, DemographicScaleSectorSentimentEnum.LOW],
            CharacterSentimentEnum.DANGER,
            "Bun is not feeling well"),
        new CharacterSentiment(
            [DemographicScaleSectorSentimentEnum.BIT_LOW],
            CharacterSentimentEnum.WARNING,
            "Bun has no fun"),
        new CharacterSentiment(
            [DemographicScaleSectorSentimentEnum.GOOD, DemographicScaleSectorSentimentEnum.EXCELLENT],
            CharacterSentimentEnum.EXCITING,
            "Bun enjoying the sun"),
        new CharacterSentiment(
            [DemographicScaleSectorSentimentEnum.BIT_HIGH],
            CharacterSentimentEnum.WARNING,
            "Bun has no fun"),
        new CharacterSentiment(
            [DemographicScaleSectorSentimentEnum.HIGH, DemographicScaleSectorSentimentEnum.TOO_HIGH],
            CharacterSentimentEnum.DANGER,
            "Bun is not feeling well")
    ]),

    new CharacterBuilder(CharacterTypeEnum.CANDY, [NutrientTypeIdEnum.SUGAR], [
        new CharacterSentiment(
            [DemographicScaleSectorSentimentEnum.TOO_LOW, DemographicScaleSectorSentimentEnum.LOW],
            CharacterSentimentEnum.DANGER,
            "Prof. Sugario has turned your world into caramel!"),
        new CharacterSentiment(
            [DemographicScaleSectorSentimentEnum.BIT_LOW],
            CharacterSentimentEnum.WARNING,
            "Prof. Sugario's evil plans become reality"),
        new CharacterSentiment(
            [DemographicScaleSectorSentimentEnum.GOOD, DemographicScaleSectorSentimentEnum.EXCELLENT],
            CharacterSentimentEnum.EXCITING,
            "Prof. Sugario is defeated"),
        new CharacterSentiment(
            [DemographicScaleSectorSentimentEnum.BIT_HIGH],
            CharacterSentimentEnum.WARNING,
            "Prof. Sugario's evil plans become reality"),
        new CharacterSentiment(
            [DemographicScaleSectorSentimentEnum.HIGH, DemographicScaleSectorSentimentEnum.TOO_HIGH],
            CharacterSentimentEnum.DANGER,
            "Prof. Sugario has turned your world into caramel!")
    ]),


    new CharacterBuilder(CharacterTypeEnum.SALMON, [49], [
        new CharacterSentiment(
            [DemographicScaleSectorSentimentEnum.TOO_LOW, DemographicScaleSectorSentimentEnum.LOW],
            CharacterSentimentEnum.DANGER,
            "Salmy cannot live without you"),
        new CharacterSentiment(
            [DemographicScaleSectorSentimentEnum.BIT_LOW],
            CharacterSentimentEnum.WARNING,
            "Salmy doesn't feel to be part of your life"),
        new CharacterSentiment(
            [DemographicScaleSectorSentimentEnum.GOOD, DemographicScaleSectorSentimentEnum.EXCELLENT],
            CharacterSentimentEnum.EXCITING,
            "Salmy is in love with you!"),
        new CharacterSentiment(
            [DemographicScaleSectorSentimentEnum.BIT_HIGH],
            CharacterSentimentEnum.WARNING,
            "You're a bit too into Salmy"),
        new CharacterSentiment(
            [DemographicScaleSectorSentimentEnum.HIGH, DemographicScaleSectorSentimentEnum.TOO_HIGH],
            CharacterSentimentEnum.DANGER,
            "There are plenty more food in the sea")
    ]),

    new CharacterBuilder(CharacterTypeEnum.SAUSAGE, [NutrientTypeIdEnum.SATD_FAT], [
        new CharacterSentiment(
            [DemographicScaleSectorSentimentEnum.TOO_LOW, DemographicScaleSectorSentimentEnum.LOW],
            CharacterSentimentEnum.DANGER,
            "Bow down to the Colonel Sausage!"),
        new CharacterSentiment(
            [DemographicScaleSectorSentimentEnum.BIT_LOW],
            CharacterSentimentEnum.WARNING,
            "Colonel Sausage is at the gate!"),
        new CharacterSentiment(
            [DemographicScaleSectorSentimentEnum.GOOD, DemographicScaleSectorSentimentEnum.EXCELLENT],
            CharacterSentimentEnum.EXCITING,
            "Colonel Sausage retreats"),
        new CharacterSentiment(
            [DemographicScaleSectorSentimentEnum.BIT_HIGH],
            CharacterSentimentEnum.WARNING,
            "Colonel Sausage is at the gate!"),
        new CharacterSentiment(
            [DemographicScaleSectorSentimentEnum.HIGH, DemographicScaleSectorSentimentEnum.TOO_HIGH],
            CharacterSentimentEnum.DANGER,
            "Bow down to the Colonel Sausage!")
    ]),


    new CharacterBuilder(CharacterTypeEnum.EGG, [11], [
        new CharacterSentiment(
            [DemographicScaleSectorSentimentEnum.TOO_LOW, DemographicScaleSectorSentimentEnum.LOW],
            CharacterSentimentEnum.DANGER,
            "Eggy is devastated"),
        new CharacterSentiment(
            [DemographicScaleSectorSentimentEnum.BIT_LOW],
            CharacterSentimentEnum.WARNING,
            "Eggy is worried about you"),
        new CharacterSentiment(
            [DemographicScaleSectorSentimentEnum.GOOD, DemographicScaleSectorSentimentEnum.EXCELLENT],
            CharacterSentimentEnum.EXCITING,
            "Eggy is excited!"),
        new CharacterSentiment(
            [DemographicScaleSectorSentimentEnum.BIT_HIGH],
            CharacterSentimentEnum.WARNING,
            "Eggy is worried about you"),
        new CharacterSentiment(
            [DemographicScaleSectorSentimentEnum.HIGH, DemographicScaleSectorSentimentEnum.TOO_HIGH],
            CharacterSentimentEnum.DANGER,
            "Eggy is devastated")
    ]),

    new CharacterBuilder(CharacterTypeEnum.APPLE, [143, 124, 123, 140, 134, 129, 133, 120], [
        new CharacterSentiment(
            [DemographicScaleSectorSentimentEnum.TOO_LOW, DemographicScaleSectorSentimentEnum.LOW],
            CharacterSentimentEnum.DANGER,
            "This Apple was so young!"),
        new CharacterSentiment(
            [DemographicScaleSectorSentimentEnum.BIT_LOW],
            CharacterSentimentEnum.WARNING,
            "You upset little Apple"),
        new CharacterSentiment(
            [DemographicScaleSectorSentimentEnum.GOOD, DemographicScaleSectorSentimentEnum.EXCELLENT],
            CharacterSentimentEnum.EXCITING,
            "You made little Apple smile!"),
        new CharacterSentiment(
            [DemographicScaleSectorSentimentEnum.BIT_HIGH],
            CharacterSentimentEnum.WARNING,
            "You upset little Apple"),
        new CharacterSentiment(
            [DemographicScaleSectorSentimentEnum.HIGH, DemographicScaleSectorSentimentEnum.TOO_HIGH],
            CharacterSentimentEnum.DANGER,
            "This Apple was so young!")
    ])

];

@Injectable()
export class DictionariesService {

    private cachedDictionaries: Option<Dictionaries> = none;

    constructor(private mySurveyResultsService: MySurveyResultsService,
                private demographicGroupsService: DemographicGroupsService,
                private nutrientTypesService: NutrientTypesService) {
    }

    get(): Observable<Dictionaries> {
        return this.cachedDictionaries.match({
            some: dictionaries => Observable.create(dictionaries),
            none: () => Observable.forkJoin(
                this.mySurveyResultsService.list(),
                this.demographicGroupsService.list(),
                this.nutrientTypesService.list()
            ).map(res => {
                let surveySubmissions = res[0];
                let nutrientTypes = res[2];
                let demographicGroups = res[1].map(dg =>
                    dg.addNutrient(nutrientTypes.filter(nt => nt.id == dg.nutrientTypeId)[0]));

                let characterRules = CharacterBuilders.map(characterBuilder => {
                    let nutrientTypeIds = characterBuilder.nutrientTypeIds;
                    let dgs = demographicGroups.filter(dg => nutrientTypeIds.indexOf(dg.nutrientTypeId) > -1);
                    return new CharacterRules(dgs, characterBuilder.type,
                        characterBuilder.sentiments);
                });

                let dictionaries = new Dictionaries(surveySubmissions, demographicGroups,
                    nutrientTypes, characterRules);

                this.cachedDictionaries = some(dictionaries);

                return dictionaries;
            })
        });
    }

}

export class Dictionaries {
    readonly surveySubmissions: SurveySubmission[];
    readonly demographicGroups: DemographicGroup[];
    readonly nutrientTypes: NutrientType[];
    readonly characterRules: CharacterRules[];

    constructor(surveySubmissions: SurveySubmission[],
                demographicGroups: DemographicGroup[],
                nutrientTypes: NutrientType[],
                characterRules: CharacterRules[]) {
        this.surveySubmissions = surveySubmissions;
        this.demographicGroups = demographicGroups;
        this.nutrientTypes = nutrientTypes;
        this.characterRules = characterRules;
    }

}
