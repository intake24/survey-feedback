import {
  DemographicGroup,
  DemographicResult,
  DemographicScaleSector,
  DemographicScaleSectorSentimentEnum
} from "../classes/demographic-group.class";
import {Food} from "../classes/survey-result.class";
import {none, Option, some} from "ts-option";
import {UserDemographic} from "./user-demographic.class";


export class CharacterRules {
  readonly nutrientTypeIds: number[];
  readonly demographicGroups: DemographicGroup[];
  readonly type: CharacterTypeEnum;
  readonly sentiments: CharacterSentiment[];

  constructor(nutrientTypeIds: number[],
              demographicGroups: DemographicGroup[],
              type: CharacterTypeEnum,
              sentiments: CharacterSentiment[]) {
    this.nutrientTypeIds = nutrientTypeIds.slice();
    this.demographicGroups = demographicGroups.map(dg => dg.clone());
    this.type = type;
    this.sentiments = sentiments.map(sent => sent.clone());
  }

  getSentiment(userDemographic: UserDemographic, foods: Food[]): Option<CharacterSentimentWithDescription> {
    let demographicGroups = this.getDemographicsGroups(userDemographic, foods)
      .map(dg => dg.get);
    let scaleSectors = demographicGroups
      .map(dg => dg.resultedDemographicGroup.scaleSectors)
      .reduce((a, b) => a.slice().concat(b), []);
    return this.pickAverageSentiment(scaleSectors)
      .map(cs => new CharacterSentimentWithDescription(this.type, cs, demographicGroups));
  }

  private getDemographicsGroups(userDemographic: UserDemographic, foods: Food[]): Option<DemographicResult>[] {
    let demographicGroups = this.demographicGroups
      .filter(dg => dg.matchesUserDemographic(userDemographic));
    return demographicGroups.map(dg => dg.getResult(userDemographic, foods))
      .filter(dg => dg.match({
        some: dg => dg.resultedDemographicGroup.scaleSectors.length != 0,
        none: () => false
      }));
  }

  private pickAverageSentiment(scaleSectors: DemographicScaleSector[]): Option<CharacterSentiment> {
    if (!scaleSectors.length) {
      return none;
    }
    let dgSenEnums = scaleSectors.map(ss => ss.sentiment);
    let enums = [
      DemographicScaleSectorSentimentEnum.TOO_LOW,
      DemographicScaleSectorSentimentEnum.LOW,
      DemographicScaleSectorSentimentEnum.BIT_LOW,
      DemographicScaleSectorSentimentEnum.GOOD,
      DemographicScaleSectorSentimentEnum.EXCELLENT,
      DemographicScaleSectorSentimentEnum.BIT_HIGH,
      DemographicScaleSectorSentimentEnum.HIGH,
      DemographicScaleSectorSentimentEnum.TOO_HIGH
    ];
    let presentEnums = enums.filter(en => dgSenEnums.indexOf(en) > -1);
    let averageEnumIndex = Math.round(presentEnums.map(e => enums.indexOf(e)).reduce((a, b) => a + b) / presentEnums.length);
    if (!presentEnums.length) {
      return none;
    } else {
      return this.getCharacterSentimentByDemographicSentiment(enums[averageEnumIndex]);
    }
  }

  private getCharacterSentimentByDemographicSentiment(dSentiment: DemographicScaleSectorSentimentEnum): Option<CharacterSentiment> {
    let sentiments = this.sentiments
      .filter(s => s.demographicScaleSectorSentiment.indexOf(dSentiment) > -1);
    return sentiments.length ? some(sentiments[0]) : none;
  }

}

export class CharacterBuilder {
  readonly type: CharacterTypeEnum;
  readonly nutrientTypeIds: number[];
  readonly sentiments: CharacterSentiment[];

  constructor(type: CharacterTypeEnum,
              nutrientTypeIds: number[],
              sentiments: CharacterSentiment[]) {
    this.nutrientTypeIds = nutrientTypeIds.slice();
    this.type = type;
    this.sentiments = sentiments.map(sent => sent.clone());
  }

}

export class CharacterSentiment {
  readonly demographicScaleSectorSentiment: DemographicScaleSectorSentimentEnum[];
  readonly sentimentType: CharacterSentimentEnum;
  readonly title: string;

  constructor(demographicScaleSectorSentiment: DemographicScaleSectorSentimentEnum[],
              sentiment: CharacterSentimentEnum,
              title: string) {
    this.demographicScaleSectorSentiment = demographicScaleSectorSentiment.slice();
    this.sentimentType = sentiment;
    this.title = title;
  }

  clone(): CharacterSentiment {
    return new CharacterSentiment(this.demographicScaleSectorSentiment,
      this.sentimentType, this.title);
  }

}

export class CharacterSentimentWithDescription {

  readonly characterType: CharacterTypeEnum;
  readonly characterSentiment: CharacterSentiment;
  readonly demographicResults: DemographicResult[];

  constructor(characterType: CharacterTypeEnum, characterSentiment: CharacterSentiment, demographicResults: DemographicResult[]) {
    this.characterType = characterType;
    this.characterSentiment = characterSentiment.clone();
    this.demographicResults = demographicResults.map(dg => dg.clone());
  }
}

export enum CharacterTypeEnum {
  BATTERY = <any>"battery",
  BREAD = <any>"bread",
  CANDY = <any>"candy",
  SALMON = <any>"salmon",
  SAUSAGE = <any>"sausage",
  EGG = <any>"egg",
  APPLE = <any>"apple",
  STRAWBERRY = <any>"strawberry",
  BURGER = <any>"burger",
  FRIES = <any>"fries",
  MILK = <any>"milk"
}

export enum CharacterSentimentEnum {
  DANGER = <any>"danger",
  WARNING = <any>"sad",
  HAPPY = <any>"happy",
  EXCITING = <any>"exciting"
}
