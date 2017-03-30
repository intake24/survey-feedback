export class NutrientType {
    readonly id: number;
    readonly description: string;
    readonly unit: string;

    constructor(id: number, description: string, unit: string) {
        this.id = id;
        this.description = description;
        this.unit = unit;
    }

    static fromJson(json: any): NutrientType {
        return new NutrientType(
            parseFloat(json.nutrientId),
            json.description,
            json.unit
        );
    }

    clone(): NutrientType {
        return new NutrientType(this.id, this.description, this.unit);
    }

}
