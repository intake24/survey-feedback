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
      "You need to charge yourself"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.BIT_LOW],
      CharacterSentimentEnum.WARNING,
      "You need more energy"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.GOOD, DemographicScaleSectorSentimentEnum.EXCELLENT],
      CharacterSentimentEnum.EXCITING,
      "Your're so energetic"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.BIT_HIGH],
      CharacterSentimentEnum.WARNING,
      Phrases.Careful),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.HIGH, DemographicScaleSectorSentimentEnum.TOO_HIGH],
      CharacterSentimentEnum.DANGER,
      Phrases.WatchOut)
  ]),

  new CharacterBuilder(CharacterTypeEnum.BREAD, [NutrientTypeIdEnum.Carbohydrate], [
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.TOO_LOW, DemographicScaleSectorSentimentEnum.LOW],
      CharacterSentimentEnum.DANGER,
      Phrases.WatchOut),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.BIT_LOW],
      CharacterSentimentEnum.WARNING,
      Phrases.Careful),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.GOOD, DemographicScaleSectorSentimentEnum.EXCELLENT],
      CharacterSentimentEnum.EXCITING,
      "Feels brilliant!"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.BIT_HIGH],
      CharacterSentimentEnum.WARNING,
      Phrases.Careful),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.HIGH, DemographicScaleSectorSentimentEnum.TOO_HIGH],
      CharacterSentimentEnum.DANGER,
      Phrases.WatchOut)
  ]),

  new CharacterBuilder(CharacterTypeEnum.APPLE, [NutrientTypeIdEnum.Fibre], [
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.TOO_LOW, DemographicScaleSectorSentimentEnum.LOW],
      CharacterSentimentEnum.DANGER,
      Phrases.WatchOut),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.BIT_LOW],
      CharacterSentimentEnum.WARNING,
      Phrases.Careful),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.GOOD, DemographicScaleSectorSentimentEnum.EXCELLENT],
      CharacterSentimentEnum.EXCITING,
      "It feels amazing!"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.BIT_HIGH],
      CharacterSentimentEnum.WARNING,
      Phrases.Careful),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.HIGH, DemographicScaleSectorSentimentEnum.TOO_HIGH],
      CharacterSentimentEnum.DANGER,
      Phrases.WatchOut)
  ]),

  new CharacterBuilder(CharacterTypeEnum.CANDY, [NutrientTypeIdEnum.Sugar], [
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.TOO_LOW, DemographicScaleSectorSentimentEnum.LOW],
      CharacterSentimentEnum.DANGER,
      Phrases.WatchOut),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.BIT_LOW],
      CharacterSentimentEnum.WARNING,
      Phrases.Careful),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.GOOD, DemographicScaleSectorSentimentEnum.EXCELLENT],
      CharacterSentimentEnum.EXCITING,
      "Life is sweet"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.BIT_HIGH],
      CharacterSentimentEnum.WARNING,
      "It's a little too sweet"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.HIGH, DemographicScaleSectorSentimentEnum.TOO_HIGH],
      CharacterSentimentEnum.DANGER,
      "Too sweet!")
  ]),

  new CharacterBuilder(CharacterTypeEnum.SALMON, [NutrientTypeIdEnum.VitaminA], [
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.TOO_LOW, DemographicScaleSectorSentimentEnum.LOW],
      CharacterSentimentEnum.DANGER,
      Phrases.WatchOut),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.BIT_LOW],
      CharacterSentimentEnum.WARNING,
      Phrases.Careful),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.GOOD, DemographicScaleSectorSentimentEnum.EXCELLENT],
      CharacterSentimentEnum.EXCITING,
      "Super!"),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.BIT_HIGH],
      CharacterSentimentEnum.WARNING,
      Phrases.Careful),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.HIGH, DemographicScaleSectorSentimentEnum.TOO_HIGH],
      CharacterSentimentEnum.DANGER,
      Phrases.WatchOut)
  ]),

  new CharacterBuilder(CharacterTypeEnum.MILK, [NutrientTypeIdEnum.Calcium], [
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.TOO_LOW, DemographicScaleSectorSentimentEnum.LOW],
      CharacterSentimentEnum.DANGER,
      Phrases.WatchOut),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.BIT_LOW],
      CharacterSentimentEnum.WARNING,
      Phrases.Careful),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.GOOD, DemographicScaleSectorSentimentEnum.EXCELLENT],
      CharacterSentimentEnum.EXCITING,
      Phrases.DoingGreat),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.BIT_HIGH],
      CharacterSentimentEnum.WARNING,
      Phrases.Careful),
    new CharacterSentiment(
      [DemographicScaleSectorSentimentEnum.HIGH, DemographicScaleSectorSentimentEnum.TOO_HIGH],
      CharacterSentimentEnum.DANGER,
      Phrases.WatchOut)
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
