import {NutrientTypeIdEnum} from "../services/dictionaries.service";

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

  getReducedFoods(day?: number): AggregateFoodStats[] {
    let foods = this.surveySubmissions
      .filter((ss, i) => day == null || day == i)
      .map(ss => ss.getFoods()).reduce((fla, flb) => fla.concat(flb), []);

    let uniqueCodes = Array.from(new Set(foods.map(f => f.code)));

    return uniqueCodes.map(code => {
      let totalConsumptionMap: Map<number, number> = new Map();
      let matchingFoods = foods.filter(f => f.code == code);
      matchingFoods.map(f => {
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
      let firstFood = matchingFoods[0];
      return new AggregateFoodStats(firstFood.localName, totalConsumptionMap);
    });
  }

}

export class AggregateFoodStats {
  readonly name: string;
  private readonly averageIntake: Map<number, number>;

  constructor(name: string, averageIntake: Map<number, number>) {
    this.name = name;
    this.averageIntake = averageIntake;
  }

  clone():AggregateFoodStats {
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
    return this.meals.map(ml => ml.foods).reduce((fla, flb) => fla.concat(flb));
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
    let mp = new Map<number, number>();
    for (let i in json.nutrients) {
      mp.set(parseInt(i), json.nutrients[i]);
    }

    let foodWeight = parseFloat(json.portionSize.portionWeight);

    let foodGroupProportions = new Map<number, number>();
    let foodGroupWeights = new Map<number, number>();

    for (let i in json.compoundFoodGroups) {
      let foodGroupId = parseInt(i);
      let proportion = json.compoundFoodGroups[i];
      foodGroupProportions.set(foodGroupId, proportion);
      foodGroupWeights.set(foodGroupId, proportion * foodWeight);
    }

    return new Food(
      json.code,
      json.englishDescription,
      json.localDescription.length ? json.localDescription[0] : "",
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
