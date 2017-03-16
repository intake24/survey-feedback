import {NutrientTypeIdEnum} from "../services/dictionaries.service";


export class Food {

    readonly englishName: string;
    readonly localName: string;
    readonly nutrientIdConsumptionMap: Map<number, number>;

    constructor(englishName: string, localName: string, nutrients: number[][]) {
        this.englishName = englishName;
        this.localName = localName;
        this.nutrientIdConsumptionMap = this.cloneInputNutrients(nutrients);
    }

    static fromJson(json: any): Food {
        return new Food(
            json.englishDescription,
            json.localDescription.length ? json.localDescription[0] : "",
            json.nutrients
        );
    }

    clone(): Food {
        let nList = Array.from(this.nutrientIdConsumptionMap.keys())
            .map(k => [k, this.nutrientIdConsumptionMap.get(k)]);
        return new Food(this.englishName, this.localName, nList);
    }

    getConsumption(nutrientTypeId: number): number {
        return Math.round((this.nutrientIdConsumptionMap.get(nutrientTypeId) || 0) * 100) / 100;
    }

    getEnergy(): number {
        return this.getConsumption(NutrientTypeIdEnum.ENERGEY);
    }

    private cloneInputNutrients(nutrients: number[][]): Map<number, number> {
        let m = new Map<number, number>();
        nutrients.forEach(nut => {
            return m.set(nut[0], nut[1]);
        });
        return m;
    }

}
