import {NutrientTypeIdEnum} from "../services/dictionaries.service";

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

  readonly englishName: string;
  readonly localName: string;
  readonly nutrientIdConsumptionMap: Map<number, number>;

  constructor(englishName: string, localName: string, nutrients: Map<number, number>) {
    this.englishName = englishName;
    this.localName = localName;
    this.nutrientIdConsumptionMap = new Map(nutrients);
  }

  static fromJson(json: any): Food {
    let mp = new Map<number, number>();
    for (let i in json.nutrients) {
      mp.set(parseInt(i), json.nutrients[i]);
    }
    return new Food(
      json.englishDescription,
      json.localDescription.length ? json.localDescription[0] : "",
      mp
    );
  }

  clone(): Food {
    return new Food(this.englishName, this.localName, this.nutrientIdConsumptionMap);
  }

  getConsumption(nutrientTypeId: number): number {
    return Math.round((this.nutrientIdConsumptionMap.get(nutrientTypeId) || 0) * 100) / 100;
  }

  getEnergy(): number {
    return this.getConsumption(NutrientTypeIdEnum.ENERGEY);
  }

}
