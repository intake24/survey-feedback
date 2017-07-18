import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Option, none, some} from "ts-option";
import {
  CharacterTypeEnum,
  CharacterBuilder,
  CharacterSentimentEnum,
  CharacterSentiment,
  CharacterRules
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
  Calcium = <number>140,
  VitaminC = <number>129
}

class Phrases {
  static WatchOut: string = "Watch out!";
  static Careful: string = "Careful!";
  static DoingGreat: string = "Doing great!";
}


const CharacterBuilders = [
  new CharacterBuilder(CharacterTypeEnum.BATTERY, [NutrientTypeIdEnum.Energy], [
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.TOO_LOW, DemographicScaleSectorSentimentEnum.LOW],
      CharacterSentimentEnum.DANGER,
      "Your battery needs a boost"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.BIT_LOW],
      CharacterSentimentEnum.WARNING,
      "Your battery needs a boost"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.GOOD, DemographicScaleSectorSentimentEnum.EXCELLENT],
      CharacterSentimentEnum.EXCITING,
      "Your're so energetic"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.BIT_HIGH],
      CharacterSentimentEnum.WARNING,
      "Energy overload"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.HIGH, DemographicScaleSectorSentimentEnum.TOO_HIGH],
      CharacterSentimentEnum.DANGER,
      "Energy overload")
  ]),

  new CharacterBuilder(CharacterTypeEnum.BREAD, [NutrientTypeIdEnum.Carbohydrate], [
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.TOO_LOW, DemographicScaleSectorSentimentEnum.LOW],
      CharacterSentimentEnum.DANGER,
      "You could be more starchy"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.BIT_LOW],
      CharacterSentimentEnum.WARNING,
      "You could be more starchy"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.GOOD, DemographicScaleSectorSentimentEnum.EXCELLENT],
      CharacterSentimentEnum.EXCITING,
      "You're Super Starchy!"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.BIT_HIGH],
      CharacterSentimentEnum.WARNING,
      "Careful on the starch"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.HIGH, DemographicScaleSectorSentimentEnum.TOO_HIGH],
      CharacterSentimentEnum.DANGER,
      "Careful on the starch")
  ]),

  new CharacterBuilder(CharacterTypeEnum.APPLE, [NutrientTypeIdEnum.Fibre], [
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.TOO_LOW, DemographicScaleSectorSentimentEnum.LOW],
      CharacterSentimentEnum.DANGER,
      "Keep your finger on pulses!"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.BIT_LOW],
      CharacterSentimentEnum.WARNING,
      "Keep your finger on pulses!"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.GOOD, DemographicScaleSectorSentimentEnum.EXCELLENT],
      CharacterSentimentEnum.EXCITING,
      "Fibre-licious!"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.BIT_HIGH],
      CharacterSentimentEnum.WARNING,
      "Keep your finger on pulses!"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.HIGH, DemographicScaleSectorSentimentEnum.TOO_HIGH],
      CharacterSentimentEnum.DANGER,
      "Keep your finger on pulses!")
  ]),

  new CharacterBuilder(CharacterTypeEnum.CANDY, [NutrientTypeIdEnum.Sugar], [
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.TOO_LOW, DemographicScaleSectorSentimentEnum.LOW],
      CharacterSentimentEnum.DANGER,
      "Take care, Sugar"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.BIT_LOW],
      CharacterSentimentEnum.WARNING,
      "Take care, Sugar"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.GOOD, DemographicScaleSectorSentimentEnum.EXCELLENT],
      CharacterSentimentEnum.EXCITING,
      "You're doing well, Sugar"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.BIT_HIGH],
      CharacterSentimentEnum.WARNING,
      "Take care, Sugar"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.HIGH, DemographicScaleSectorSentimentEnum.TOO_HIGH],
      CharacterSentimentEnum.DANGER,
      "Take care, Sugar")
  ]),

  new CharacterBuilder(CharacterTypeEnum.SALMON, [NutrientTypeIdEnum.VitaminA], [
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.TOO_LOW, DemographicScaleSectorSentimentEnum.LOW],
      CharacterSentimentEnum.DANGER,
      "Not quite scoring A* for Vitamin A"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.BIT_LOW],
      CharacterSentimentEnum.WARNING,
      "Not quite scoring A* for Vitamin A"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.GOOD, DemographicScaleSectorSentimentEnum.EXCELLENT],
      CharacterSentimentEnum.EXCITING,
      "Scoring A* for Vitamin A"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.BIT_HIGH],
      CharacterSentimentEnum.WARNING,
      "Too fishy"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.HIGH, DemographicScaleSectorSentimentEnum.TOO_HIGH],
      CharacterSentimentEnum.DANGER,
      "Too fishy")
  ]),

  new CharacterBuilder(CharacterTypeEnum.MILK, [NutrientTypeIdEnum.Calcium], [
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.TOO_LOW, DemographicScaleSectorSentimentEnum.LOW],
      CharacterSentimentEnum.DANGER,
      "Your milk could be spoiled"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.BIT_LOW],
      CharacterSentimentEnum.WARNING,
      "Your milk could be spoiled"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.GOOD, DemographicScaleSectorSentimentEnum.EXCELLENT],
      CharacterSentimentEnum.EXCITING,
      "Say cheese!"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.BIT_HIGH],
      CharacterSentimentEnum.WARNING,
      "Your milk could be spoiled"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.HIGH, DemographicScaleSectorSentimentEnum.TOO_HIGH],
      CharacterSentimentEnum.DANGER,
      "Your milk could be spoiled")
  ]),

  new CharacterBuilder(CharacterTypeEnum.BURGER, [NutrientTypeIdEnum.SatdFat], [
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.TOO_LOW, DemographicScaleSectorSentimentEnum.LOW],
      CharacterSentimentEnum.DANGER,
      "Please don't eat me!"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.BIT_LOW],
      CharacterSentimentEnum.WARNING,
      "Please don't eat me!"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.GOOD, DemographicScaleSectorSentimentEnum.EXCELLENT],
      CharacterSentimentEnum.EXCITING,
      "Such a rate!"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.BIT_HIGH],
      CharacterSentimentEnum.WARNING,
      "Please don't eat me!"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.HIGH, DemographicScaleSectorSentimentEnum.TOO_HIGH],
      CharacterSentimentEnum.DANGER,
      "Please don't eat me!")
  ]),

  new CharacterBuilder(CharacterTypeEnum.FRIES, [NutrientTypeIdEnum.TotalFat], [
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.TOO_LOW, DemographicScaleSectorSentimentEnum.LOW],
      CharacterSentimentEnum.DANGER,
      "Chip is feeling fried"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.BIT_LOW],
      CharacterSentimentEnum.WARNING,
      "Chip is feeling fried"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.GOOD, DemographicScaleSectorSentimentEnum.EXCELLENT],
      CharacterSentimentEnum.EXCITING,
      "Chip is feeling delicious!"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.BIT_HIGH],
      CharacterSentimentEnum.WARNING,
      "Chip is feeling fried"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.HIGH, DemographicScaleSectorSentimentEnum.TOO_HIGH],
      CharacterSentimentEnum.DANGER,
      "Chip is feeling fried")
  ]),

  new CharacterBuilder(CharacterTypeEnum.EGG, [NutrientTypeIdEnum.Protein], [
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.TOO_LOW, DemographicScaleSectorSentimentEnum.LOW],
      CharacterSentimentEnum.DANGER,
      "Pump up that protein!"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.BIT_LOW],
      CharacterSentimentEnum.WARNING,
      "Pump up that protein!"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.GOOD, DemographicScaleSectorSentimentEnum.EXCELLENT],
      CharacterSentimentEnum.EXCITING,
      "Feels Egg-static!"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.BIT_HIGH],
      CharacterSentimentEnum.WARNING,
      "Whey too much protein!"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.HIGH, DemographicScaleSectorSentimentEnum.TOO_HIGH],
      CharacterSentimentEnum.DANGER,
      "Whey too much protein!")
  ]),

  new CharacterBuilder(CharacterTypeEnum.STRAWBERRY, [NutrientTypeIdEnum.VitaminC], [
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.TOO_LOW, DemographicScaleSectorSentimentEnum.LOW],
      CharacterSentimentEnum.DANGER,
      "Stranded in the Vitamin Sea"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.BIT_LOW],
      CharacterSentimentEnum.WARNING,
      "Stranded in the Vitamin Sea"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.GOOD, DemographicScaleSectorSentimentEnum.EXCELLENT],
      CharacterSentimentEnum.EXCITING,
      "Sí Señor(ita)!"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.BIT_HIGH],
      CharacterSentimentEnum.WARNING,
      "Too deep in the Vitamin Sea"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.HIGH, DemographicScaleSectorSentimentEnum.TOO_HIGH],
      CharacterSentimentEnum.DANGER,
      "Too deep in the Vitamin Sea")
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
        let surveyResult = res[0];
        let nutrientTypes = res[2];
        let demographicGroups = res[1].map(dg =>
          dg.addNutrient(nutrientTypes.filter(nt => nt.id == dg.nutrientTypeId)[0]));

        let characterRules = CharacterBuilders.map(characterBuilder => {
          let nutrientTypeIds = characterBuilder.nutrientTypeIds;
          let dgs = demographicGroups.filter(dg => nutrientTypeIds.indexOf(dg.nutrientTypeId) > -1);
          return new CharacterRules(nutrientTypeIds, dgs, characterBuilder.type,
            characterBuilder.sentiments);
        });

        let dictionaries = new Dictionaries(surveyResult, demographicGroups,
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

  constructor(surveyResult: SurveyResult,
              demographicGroups: DemographicGroup[],
              nutrientTypes: NutrientType[],
              characterRules: CharacterRules[]) {
    this.surveyResult = surveyResult;
    this.demographicGroups = demographicGroups;
    this.nutrientTypes = nutrientTypes;
    this.characterRules = characterRules;
  }

}
