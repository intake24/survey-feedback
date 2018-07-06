import {DemographicRange} from "./demographic-group.class";

export class FoodGroupFeedbackThreshold {
  threshold: number;
  message: string;
}

const FOOD_GROUP_RED_MEAT = 25;

export class FoodGroupFeedback {
  groupName: string;
  foodGroupIds: number[];
  recommendedIntake: DemographicRange;
  low?: FoodGroupFeedbackThreshold;
  high?: FoodGroupFeedbackThreshold;
  tellMeMore: string;

  static fromJson(json: any): FoodGroupFeedback[] {

    let result = new Array<FoodGroupFeedback>();

    for (let i = 0; i < json.length; i++) {
      result.push({
        groupName: json[i].name,
        foodGroupIds: json[i].foodGroupIds,
        recommendedIntake: new DemographicRange(0, 70), // FIXME: hardcoded, get this from database
        low: json[i].low.length == 1 ? json[i].low[0] : undefined,
        high: json[i].high.length == 1 ? json[i].high[0] : undefined,
        tellMeMore: json[i].tellMeMore
      });
    }

    return result;
  }

  static getBackgroundClassForFoodGroup(foodGroupIds: number[]): string {
    if (foodGroupIds.indexOf(FOOD_GROUP_RED_MEAT) != -1)
      return "red-meat";

    return "";
  }

}
