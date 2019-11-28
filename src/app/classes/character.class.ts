import {
  DemographicGroup,
  DemographicResult,
  DemographicScaleSector,
  DemographicScaleSectorSentimentEnum
} from '../classes/demographic-group.class';
import {AggregateFoodStats, Food} from '../classes/survey-result.class';
import {none, Option, some} from 'ts-option';
import {UserDemographic} from './user-demographic.class';
import {SurveyFeedbackStyleEnum} from './survey-feedback-style.enum';


export class CharacterRules {
  constructor(readonly nutrientTypeIds: number[],
              readonly demographicGroups: ReadonlyArray<DemographicGroup>,
              readonly type: CharacterTypeEnum,
              readonly sentiments: CharacterSentiment[],
              readonly displayInFeedbackStyle?: SurveyFeedbackStyleEnum) {
  }

  getSentiment(userDemographic: UserDemographic, foods: AggregateFoodStats[]): Option<CharacterCardParameters> {
    const demographicGroups = this.getDemographicsGroups(userDemographic, foods)
      .map(dg => dg.get);
    const scaleSectors = demographicGroups
      .map(dg => dg.resultedDemographicGroup.scaleSectors)
      .reduce((a, b) => a.slice().concat(b), []);
    return this.pickAverageSentiment(scaleSectors)
      .map(cs => new CharacterCardParameters(this.type, cs, demographicGroups));
  }

  private getDemographicsGroups(userDemographic: UserDemographic, foods: AggregateFoodStats[]): Option<DemographicResult>[] {
    const demographicGroups = this.demographicGroups
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
    const dgSenEnums = scaleSectors.map(ss => ss.sentiment);
    const enums = [
      DemographicScaleSectorSentimentEnum.TOO_LOW,
      DemographicScaleSectorSentimentEnum.LOW,
      DemographicScaleSectorSentimentEnum.BIT_LOW,
      DemographicScaleSectorSentimentEnum.GOOD,
      DemographicScaleSectorSentimentEnum.EXCELLENT,
      DemographicScaleSectorSentimentEnum.BIT_HIGH,
      DemographicScaleSectorSentimentEnum.HIGH,
      DemographicScaleSectorSentimentEnum.TOO_HIGH
    ];
    const presentEnums = enums.filter(en => dgSenEnums.indexOf(en) > -1);
    const averageEnumIndex = Math.round(presentEnums.map(e => enums.indexOf(e)).reduce((a, b) => a + b) / presentEnums.length);
    if (!presentEnums.length) {
      return none;
    } else {
      return this.getCharacterSentimentByDemographicSentiment(enums[averageEnumIndex]);
    }
  }

  private getCharacterSentimentByDemographicSentiment(dSentiment: DemographicScaleSectorSentimentEnum): Option<CharacterSentiment> {
    const sentiments = this.sentiments
      .filter(s => s.demographicScaleSectorSentiment.indexOf(dSentiment) > -1);
    return sentiments.length ? some(sentiments[0]) : none;
  }

}

export class CharacterBuilder {
  constructor(readonly type: CharacterTypeEnum,
              readonly nutrientTypeIds: number[],
              readonly sentiments: CharacterSentiment[],
              readonly displayInFeedbackStyle?: SurveyFeedbackStyleEnum) {
  }

}

export class CharacterSentiment {
  constructor(readonly demographicScaleSectorSentiment: DemographicScaleSectorSentimentEnum[],
              readonly sentimentType: CharacterSentimentEnum,
              readonly title: string) {

  }

  clone(): CharacterSentiment {
    return new CharacterSentiment(this.demographicScaleSectorSentiment,
      this.sentimentType, this.title);
  }

}

export class CharacterCardParameters {
  readonly cardType = 'character';

  constructor(readonly characterType: CharacterTypeEnum,
              readonly characterSentiment: CharacterSentiment,
              readonly demographicResults: DemographicResult[]) {
  }
}

export enum CharacterTypeEnum {
  BATTERY = 'battery',
  BREAD = 'bread',
  CANDY = 'candy',
  SALMON = 'salmon',
  SAUSAGE = 'sausage',
  EGG = 'egg',
  APPLE = 'apple',
  STRAWBERRY = 'strawberry',
  BURGER = 'burger',
  FRIES = 'fries',
  MILK = 'milk',
  IRON = 'iron',
  FOLATE = 'folate',
  CO2 = 'co2'
}

export enum CharacterSentimentEnum {
  DANGER = 'danger',
  WARNING = 'sad',
  HAPPY = 'happy',
  EXCITING = 'exciting'
}
