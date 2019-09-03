import {DemographicNutrientRuleTypeEnum} from './demographic-group.class';

export class DemographicNutrientRuleTypeDescriptions {

  private static readonly descriptionMap: Map<DemographicNutrientRuleTypeEnum, string> = new Map([
    [DemographicNutrientRuleTypeEnum.Range,
      'Feedback is based on your consumption of the corresponding ' +
      'nutrient fitting into optimal intake.'],
    [DemographicNutrientRuleTypeEnum.EnergyDividedByBmr,
      'Feedback is based on your energy intake ' +
      'divided by BMR fitting into optimal intake.'
    ],
    [DemographicNutrientRuleTypeEnum.PercentageOfEnergy,
      'Feedback is based on the contribution of the corresponding nutrient ' +
      'to your energy intake.'],
    [DemographicNutrientRuleTypeEnum.PerUnitOfWeight,
      'Feedback is based on your consumption of the corresponding nutrient ' +
      'per Kg of your weight fitting into optimal intake.'],
  ]);

  static getItem(demographicNutrientRuleTypeEnum: DemographicNutrientRuleTypeEnum): string {
    return DemographicNutrientRuleTypeDescriptions.descriptionMap.get(demographicNutrientRuleTypeEnum);
  }

}
