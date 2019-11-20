import {DemographicRange} from './demographic-group.class';

export class FoodGroupFeedbackThreshold {
  threshold: number;
  message: string;
}

const NUTRIENT_ID_RED_MEAT = 266;

export class FoodGroupFeedback {
  groupName: string;
  nutrientIds: number[];
  recommendedIntake: DemographicRange;
  low?: FoodGroupFeedbackThreshold;
  high?: FoodGroupFeedbackThreshold;
  tellMeMore: string;

  static fromJson(json: any): FoodGroupFeedback[] {

    const result = new Array<FoodGroupFeedback>();

    for (let i = 0; i < json.length; i++) {

      const low: FoodGroupFeedbackThreshold = json[i].low.length == 1 ? json[i].low[0] : undefined;
      const high: FoodGroupFeedbackThreshold = json[i].high.length == 1 ? json[i].high[0] : undefined;

      const recommendedIntake = new DemographicRange(low ? low.threshold : 0, high ? high.threshold : 1000);

      result.push({
        groupName: json[i].name,
        nutrientIds: json[i].nutrientIds,
        recommendedIntake,
        low,
        high,
        tellMeMore: json[i].tellMeMore
      });
    }

    return result;
  }

  static getBackgroundClassForFoodGroup(foodGroupIds: number[]): string {
    if (foodGroupIds.indexOf(NUTRIENT_ID_RED_MEAT) != -1) {
      return 'red-meat';
    }

    return '';
  }

}
