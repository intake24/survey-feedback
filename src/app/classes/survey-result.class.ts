import {NutrientTypeIdEnum} from '../services/dictionaries.service';
import {getLocaleNumberFormat} from '@angular/common';

export class SurveyStats {

  readonly surveySubmissions: SurveySubmission[];

  constructor(surveySubmissions: SurveySubmission[]) {
    this.surveySubmissions = surveySubmissions.map(ss => ss.clone());
  }

  clone(): SurveyStats {
    return new SurveyStats(this.surveySubmissions);
  }

  static fromJson(jsonList: any[]): SurveyStats {
    return new SurveyStats(jsonList.map(js => SurveySubmission.fromJson(js)));
  }

  // Returns a flat array of all food records for the selected day or for all days
  // if no day is selected
  private getFoods(day?: number): Food[] {
    return this.surveySubmissions
      .filter((ss, i) => day == null || day == i)
      .map(ss => ss.getFoods()).reduce((acc, foods) => acc.concat(foods), []);
  }

  private readonly JUICE_NUTRIENT_IDS = [254, 255];
  private readonly FRUIT_NUTRIENT_IDS = [252];
  private readonly DRIED_FRUIT_NUTRIENT_IDS = [253];
  private readonly VEGETABLE_NUTRIENT_IDS = [262, 256, 257, 258, 259];
  private readonly BEANS_PULSES_NUTRIENT_IDS = [260];

  private getTotalForSubset(nutrientIntake: Map<number, number>, nutrientIds: number[]) {
    let total = 0;

    nutrientIntake.forEach((weight, groupId) => {
      if (nutrientIds.indexOf(groupId) != -1) {
        total += weight;
      }
    });

    return total;
  }

  getFruitAndVegPortions(day?: number): FruitAndVegPortions {
    const averages = this.getAverageIntake(day);

    const juicesTotal = this.getTotalForSubset(averages, this.JUICE_NUTRIENT_IDS);
    const beansAndPulsesTotal = this.getTotalForSubset(averages, this.BEANS_PULSES_NUTRIENT_IDS);
    const fruitTotal = this.getTotalForSubset(averages, this.FRUIT_NUTRIENT_IDS);
    const driedFruitTotal = this.getTotalForSubset(averages, this.DRIED_FRUIT_NUTRIENT_IDS);
    const vegetablesTotal = this.getTotalForSubset(averages, this.VEGETABLE_NUTRIENT_IDS);

    const juices = Math.min(150, juicesTotal) / 150;
    const beansAndPulses = Math.min(80, beansAndPulsesTotal) / 80;
    const fruit = fruitTotal / 80;
    const driedFruit = driedFruitTotal / 30;
    const vegetables = vegetablesTotal / 80;

    return {
      juices,
      beansAndPulses,
      fruit,
      driedFruit,
      vegetables,
      total: juices + beansAndPulses + fruit + driedFruit + vegetables
    }
  }

  getAverageIntake(day?: number): Map<number, number> {
    const foods = this.getFoods(day);
    const averageIntake = new Map<number, number>();

    foods.forEach(food =>
      Array.from(food.nutrientIdConsumptionMap.keys()).forEach(nutrientId => {
          if (!averageIntake.has(nutrientId)) {
            averageIntake.set(nutrientId, food.nutrientIdConsumptionMap.get(nutrientId));
          } else {
            averageIntake.set(nutrientId, averageIntake.get(nutrientId) + food.nutrientIdConsumptionMap.get(nutrientId));
          }
        })
    );

    if (day == null) {
      Array.from(averageIntake.keys()).forEach(nutrientId => {
        averageIntake.set(nutrientId, averageIntake.get(nutrientId) / this.surveySubmissions.length);
      })
    }

    return averageIntake;
  }

  getReducedFoods(day?: number): AggregateFoodStats[] {

    const foods = this.getFoods(day);

    const uniqueFoodCodes = Array.from(new Set(foods.map(f => f.code)));

    return uniqueFoodCodes.map(code => {
      const totalConsumptionMap: Map<number, number> = new Map();
      const matchingFoods = foods.filter(f => f.code == code);
      matchingFoods.forEach(f => {
        Array.from(f.nutrientIdConsumptionMap.keys()).map(k => {
          if (!totalConsumptionMap.has(k)) {
            totalConsumptionMap.set(k, 0);
          }
          totalConsumptionMap.set(k, totalConsumptionMap.get(k) + f.nutrientIdConsumptionMap.get(k));
        });
      });
      // We need to get average consumption per day.
      // At the moment we do that by getting average consumption of nutrient per one submission
      Array.from(totalConsumptionMap.keys()).map(k => {
        totalConsumptionMap.set(k, totalConsumptionMap.get(k) / (day == null ? this.surveySubmissions.length : 1));
      });
      const firstFood = matchingFoods[0];
      return new AggregateFoodStats(firstFood.localName, totalConsumptionMap);
    });
  }
}

export class FruitAndVegPortions {
  readonly juices: number;
  readonly beansAndPulses: number;
  readonly fruit: number;
  readonly driedFruit: number;
  readonly vegetables: number;
  readonly total: number;
}

export class AggregateFoodStats {
  readonly name: string;
  private readonly averageIntake: Map<number, number>;

  constructor(name: string, averageIntake: Map<number, number>) {
    this.name = name;
    this.averageIntake = averageIntake;
  }

  clone(): AggregateFoodStats {
    return new AggregateFoodStats(this.name, new Map(this.averageIntake));
  }

  getAverageIntake(nutrientTypeId: number): number {
    return Math.round((this.averageIntake.get(nutrientTypeId) || 0) * 10) / 10;
  }

  getAverageEnergyIntake(): number {
    return this.getAverageIntake(NutrientTypeIdEnum.Energy);
  }
}

export class SurveySubmission {

  readonly id: string;
  readonly startTime: Date;
  readonly endTime: Date;
  readonly meals: Meal[];

  constructor(id: string, startTime: Date, endTime: Date, meals: Meal[]) {
    this.id = id;
    this.startTime = startTime;
    this.endTime = endTime;
    this.meals = meals.map(m => m.clone())
  }

  clone(): SurveySubmission {
    return new SurveySubmission(this.id, this.startTime, this.endTime, this.meals);
  }

  getFoods(): Food[] {
    return this.meals
      .map(meal => meal.foods)
      .reduce((acc, foods) => acc.concat(foods));
  }

  static fromJson(json: any): SurveySubmission {
    return new SurveySubmission(json.id, new Date(json.startDate), new Date(json.endDate),
      json.meals.map(jm => Meal.fromJson(jm)));
  }

}

export class Meal {

  readonly name: string;
  readonly time: [number, number];
  readonly foods: Food[];

  constructor(name: string, time: [number, number], foods: Food[]) {
    this.name = name;
    this.time = [time[0], time[1]];
    this.foods = foods.map(f => f.clone());
  }

  clone(): Meal {
    return new Meal(this.name, this.time, this.foods);
  }

  static fromJson(json: any): Meal {
    return new Meal(json.name, [parseInt(json.hours), parseInt(json.minutes)],
      json.foods.map(jf => Food.fromJson(jf)));
  }

}

export class Food {

  readonly code: string;
  readonly englishName: string;
  readonly localName: string;
  readonly nutrientIdConsumptionMap: Map<number, number>;
  readonly foodGroupProportions: Map<number, number>;
  readonly foodGroupWeights: Map<number, number>;

  constructor(code: string, englishName: string, localName: string, nutrients: Map<number, number>,
              foodGroupProportions: Map<number, number>, foodGroupWeights: Map<number, number>) {
    this.code = code;
    this.englishName = englishName;
    this.localName = localName;
    this.nutrientIdConsumptionMap = new Map(nutrients);
    this.foodGroupProportions = new Map(foodGroupProportions);
    this.foodGroupWeights = new Map(foodGroupWeights);
  }

  static fromJson(json: any): Food {
    const mp = new Map<number, number>();
    for (const i in json.nutrients) {
      mp.set(parseInt(i), json.nutrients[i]);
    }

    const foodWeight = parseFloat(json.portionSize.portionWeight);

    const foodGroupProportions = new Map<number, number>();
    const foodGroupWeights = new Map<number, number>();

    for (const i in json.compoundFoodGroups) {
      const foodGroupId = parseInt(i);
      const proportion = json.compoundFoodGroups[i];
      foodGroupProportions.set(foodGroupId, proportion);
      foodGroupWeights.set(foodGroupId, proportion / 100 * foodWeight);
    }

    return new Food(
      json.code,
      json.englishDescription,
      json.localDescription.length ? json.localDescription[0] : '',
      mp,
      foodGroupProportions,
      foodGroupWeights
    );
  }

  clone(): Food {
    return new Food(this.code, this.englishName, this.localName, this.nutrientIdConsumptionMap, this.foodGroupProportions,
      this.foodGroupWeights);
  }

  getConsumption(nutrientTypeId: number): number {
    return Math.round((this.nutrientIdConsumptionMap.get(nutrientTypeId) || 0) * 10) / 10;
  }

  getEnergy(): number {
    return this.getConsumption(NutrientTypeIdEnum.Energy);
  }

}
