import {NutrientTypeIdEnum} from "../services/dictionaries.service";


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
    let m = new Map<number, number>();
    for (let i in json.nutrients) {
      m.set(parseInt(i), json.nutrients[i]);
    }
    return new Food(
      json.englishDescription,
      json.localDescription.length ? json.localDescription[0] : "",
      m
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
