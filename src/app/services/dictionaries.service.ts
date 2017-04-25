import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Option, none, some} from "ts-option";
import {
  CharacterTypeEnum, CharacterBuilder, CharacterSentimentEnum,
  CharacterSentiment, CharacterRules
} from "../classes/character.class";
import {DemographicScaleSectorSentimentEnum, DemographicGroup} from "../classes/demographic-group.class";
import {SurveysService} from "./surveys.service";
import {DemographicGroupsService} from "./demographic-groups.service";
import {NutrientTypesService} from "./nutrient-types.service";
import {SurveyResult} from "../classes/survey-result.class";
import {NutrientType} from "../classes/nutrient-types.class";
import {AppConfig} from "../conf";


export enum NutrientTypeIdEnum {
  Energy = <number>1,
  Carbohydrate = <number>13,
  Protein = <number>11,
  TotalFat = <number>49,
  Sugar = <number>23,
  SatdFat = <number>50,
  Fibre = <number>15,
  VitaminA = <number>120,
  Calcium = <number>129,
  VitaminC = <number>129
}


const CharacterBuilders = [
  new CharacterBuilder(CharacterTypeEnum.BATTERY, [NutrientTypeIdEnum.Energy], [
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
      "Feeling a little sluggish"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.HIGH, DemographicScaleSectorSentimentEnum.TOO_HIGH],
      CharacterSentimentEnum.DANGER,
      "Feeling sluggish")
  ]),

  new CharacterBuilder(CharacterTypeEnum.BREAD, [NutrientTypeIdEnum.Carbohydrate], [
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.TOO_LOW, DemographicScaleSectorSentimentEnum.LOW],
      CharacterSentimentEnum.DANGER,
      "Bun is feeling unwell"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.BIT_LOW],
      CharacterSentimentEnum.WARNING,
      "Bun isn’t feeling well"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.GOOD, DemographicScaleSectorSentimentEnum.EXCELLENT],
      CharacterSentimentEnum.EXCITING,
      "Bun is feeling brilliant!"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.BIT_HIGH],
      CharacterSentimentEnum.WARNING,
      "Bun isn’t feeling well"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.HIGH, DemographicScaleSectorSentimentEnum.TOO_HIGH],
      CharacterSentimentEnum.DANGER,
      "Bun is feeling unwell")
  ]),

  new CharacterBuilder(CharacterTypeEnum.APPLE, [NutrientTypeIdEnum.Fibre], [
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.TOO_LOW, DemographicScaleSectorSentimentEnum.LOW],
      CharacterSentimentEnum.DANGER,
      "Apple isn't feeling well"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.BIT_LOW],
      CharacterSentimentEnum.WARNING,
      "Apple isn’t feeling very well"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.GOOD, DemographicScaleSectorSentimentEnum.EXCELLENT],
      CharacterSentimentEnum.EXCITING,
      "Apple is feeling amazing!"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.BIT_HIGH],
      CharacterSentimentEnum.WARNING,
      "Apple isn’t feeling very well"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.HIGH, DemographicScaleSectorSentimentEnum.TOO_HIGH],
      CharacterSentimentEnum.DANGER,
      "Apple isn't feeling well")
  ]),

  new CharacterBuilder(CharacterTypeEnum.CANDY, [NutrientTypeIdEnum.Sugar], [
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

  new CharacterBuilder(CharacterTypeEnum.SALMON, [NutrientTypeIdEnum.VitaminA], [
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.TOO_LOW, DemographicScaleSectorSentimentEnum.LOW],
      CharacterSentimentEnum.DANGER,
      "Salmy isn't feeling well"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.BIT_LOW],
      CharacterSentimentEnum.WARNING,
      "Salmy has a tummy ache"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.GOOD, DemographicScaleSectorSentimentEnum.EXCELLENT],
      CharacterSentimentEnum.EXCITING,
      "Salmy is feeling super!"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.BIT_HIGH],
      CharacterSentimentEnum.WARNING,
      "Salmy has a tummy ache"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.HIGH, DemographicScaleSectorSentimentEnum.TOO_HIGH],
      CharacterSentimentEnum.DANGER,
      "Salmy isn't feeling well")
  ]),

  new CharacterBuilder(CharacterTypeEnum.MILK, [NutrientTypeIdEnum.Calcium], [
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.TOO_LOW, DemographicScaleSectorSentimentEnum.LOW],
      CharacterSentimentEnum.DANGER,
      "Milk is spoiled"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.BIT_LOW],
      CharacterSentimentEnum.WARNING,
      "Milk is feeling unwell"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.GOOD, DemographicScaleSectorSentimentEnum.EXCELLENT],
      CharacterSentimentEnum.EXCITING,
      "Milk is feeling magnificent!"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.BIT_HIGH],
      CharacterSentimentEnum.WARNING,
      "Milk is feeling unwell"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.HIGH, DemographicScaleSectorSentimentEnum.TOO_HIGH],
      CharacterSentimentEnum.DANGER,
      "Milk is spoiled")
  ]),

  new CharacterBuilder(CharacterTypeEnum.BURGER, [NutrientTypeIdEnum.SatdFat], [
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.TOO_LOW, DemographicScaleSectorSentimentEnum.LOW],
      CharacterSentimentEnum.DANGER,
      "Bow down to the Colonel Burger!"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.BIT_LOW],
      CharacterSentimentEnum.WARNING,
      "Colonel Burger is at the gate!"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.GOOD, DemographicScaleSectorSentimentEnum.EXCELLENT],
      CharacterSentimentEnum.EXCITING,
      "Colonel Burger retreats"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.BIT_HIGH],
      CharacterSentimentEnum.WARNING,
      "Colonel Burger is at the gate!"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.HIGH, DemographicScaleSectorSentimentEnum.TOO_HIGH],
      CharacterSentimentEnum.DANGER,
      "Bow down to the Colonel Burger!")
  ]),

  new CharacterBuilder(CharacterTypeEnum.FRIES, [NutrientTypeIdEnum.TotalFat], [
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.TOO_LOW, DemographicScaleSectorSentimentEnum.LOW],
      CharacterSentimentEnum.DANGER,
      "Chip is feeling fried"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.BIT_LOW],
      CharacterSentimentEnum.WARNING,
      "Chip is feeling tired"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.GOOD, DemographicScaleSectorSentimentEnum.EXCELLENT],
      CharacterSentimentEnum.EXCITING,
      "Chip is feeling delicious!"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.BIT_HIGH],
      CharacterSentimentEnum.WARNING,
      "Chip is feeling tired"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.HIGH, DemographicScaleSectorSentimentEnum.TOO_HIGH],
      CharacterSentimentEnum.DANGER,
      "Chip is feeling fried")
  ]),

  new CharacterBuilder(CharacterTypeEnum.EGG, [NutrientTypeIdEnum.Protein], [
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
      "Eggy is feeling Egg-static!"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.BIT_HIGH],
      CharacterSentimentEnum.WARNING,
      "Eggy is worried about you"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.HIGH, DemographicScaleSectorSentimentEnum.TOO_HIGH],
      CharacterSentimentEnum.DANGER,
      "Eggy is devastated")
  ]),

  new CharacterBuilder(CharacterTypeEnum.STRAWBERRY, [NutrientTypeIdEnum.VitaminC], [
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.TOO_LOW, DemographicScaleSectorSentimentEnum.LOW],
      CharacterSentimentEnum.DANGER,
      "Berry is feeling unwell"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.BIT_LOW],
      CharacterSentimentEnum.WARNING,
      "Berry isn't feeling well"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.GOOD, DemographicScaleSectorSentimentEnum.EXCELLENT],
      CharacterSentimentEnum.EXCITING,
      "Berry is feeling cheery!"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.BIT_HIGH],
      CharacterSentimentEnum.WARNING,
      "Berry isn't feeling well"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.HIGH, DemographicScaleSectorSentimentEnum.TOO_HIGH],
      CharacterSentimentEnum.DANGER,
      "Berry is feeling unwell")
  ])

];

@Injectable()
export class DictionariesService {

  private cachedDictionaries: Option<Dictionaries> = none;

  constructor(private mySurveyResultsService: SurveysService,
              private demographicGroupsService: DemographicGroupsService,
              private nutrientTypesService: NutrientTypesService) {
  }

  get(): Observable<Dictionaries> {
    return this.cachedDictionaries.match({
      some: dictionaries => Observable.of(dictionaries),
      none: () => Observable.forkJoin(
        this.mySurveyResultsService.getMySurveyResults(AppConfig.surveyId),
        this.demographicGroupsService.list(),
        this.nutrientTypesService.list()
      ).map(res => {
        let surveySubmissions = res[0];
        console.log(surveySubmissions);
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
  readonly surveyResult: SurveyResult;
  readonly demographicGroups: DemographicGroup[];
  readonly nutrientTypes: NutrientType[];
  readonly characterRules: CharacterRules[];

  constructor(surveySubmissions: SurveyResult,
              demographicGroups: DemographicGroup[],
              nutrientTypes: NutrientType[],
              characterRules: CharacterRules[]) {
    this.surveyResult = surveySubmissions;
    this.demographicGroups = demographicGroups;
    this.nutrientTypes = nutrientTypes;
    this.characterRules = characterRules;
  }

}
