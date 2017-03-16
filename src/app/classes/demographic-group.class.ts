import {Option, none, some} from "ts-option";
import {NutrientType} from "./nutrient-types.class";
import {Food} from "./food.class";
import {HenryCoefficientsCalculator} from "./henry-coefficient.class";

export class DemographicGroup {

    readonly id: Option<number>;
    readonly sex: Option<DemographicSexEnum>;
    readonly age: Option<DemographicRange>;
    readonly height: Option<DemographicRange>;
    readonly weight: Option<DemographicRange>;
    readonly nutrientTypeId: number;
    readonly nutrient: Option<NutrientType>;
    readonly nutrientRuleType: DemographicNutrientRuleTypeEnum;
    readonly nutrientTypeKCalPerUnit: Option<number>;
    readonly scaleSectors: DemographicScaleSector[];

    constructor(id: Option<number>,
                nutrientTypeId: number,
                nutrientRuleType: DemographicNutrientRuleTypeEnum,
                scaleSectors: DemographicScaleSector[],
                sex: Option<DemographicSexEnum>,
                age: Option<DemographicRange>,
                height: Option<DemographicRange>,
                weight: Option<DemographicRange>,
                nutrientTypeKCalPerUnit: Option<number>,
                nutrient: Option<NutrientType>) {
        this.id = id;
        this.sex = sex;
        this.age = age.map(a => a.clone());
        this.height = height.map(h => h.clone());
        this.weight = weight.map(w => w.clone());
        this.nutrientTypeId = nutrientTypeId;
        this.nutrient = nutrient.map(n => n.clone());
        this.nutrientRuleType = nutrientRuleType;
        this.nutrientTypeKCalPerUnit = nutrientTypeKCalPerUnit;
        this.scaleSectors = scaleSectors.map(s => s.clone());
    }

    static fromJson(json: any): DemographicGroup {
        return new DemographicGroup(
            some(parseInt(json.id)),
            parseInt(json.nutrientTypeId),
            json.nutrientRuleType,
            json.scaleSectors.map(DemographicScaleSector.fromJson),
            json.sex.length ? some(json.sex[0]) : none,
            DemographicRange.fromOptionalJson(json.age),
            DemographicRange.fromOptionalJson(json.height),
            DemographicRange.fromOptionalJson(json.weight),
            json.nutrientTypeKCalPerUnit.length ? some(json.nutrientTypeKCalPerUnit[0]) : none,
            none
        );
    }

    clone(): DemographicGroup {
        return new DemographicGroup(this.id, this.nutrientTypeId, this.nutrientRuleType, this.scaleSectors,
            this.sex, this.age, this.height, this.weight, this.nutrientTypeKCalPerUnit,
            this.nutrient);
    }

    getResult(userDemographic: UserDemographic,
              surveyResults: Food[]): Option<DemographicResult> {

        return this.getConsumption(userDemographic, surveyResults)
            .flatMap(cons => {
                let scaleSector = this.getScaleSectorByValue(cons);
                let bestScaleSector = this.getScaleSectorByBestSentiment();

                return scaleSector.flatMap(ss => {
                    return bestScaleSector.flatMap(bss => {
                        return some(new DemographicResult(
                            this.cloneWithCustomScalesectors([ss]),
                            this.cloneWithCustomScalesectors([bss]),
                            cons));
                    })
                })

            });
    }

    addNutrient(nutrient: NutrientType): DemographicGroup {
        return new DemographicGroup(this.id, this.nutrientTypeId, this.nutrientRuleType, this.scaleSectors,
            this.sex, this.age, this.height, this.weight, this.nutrientTypeKCalPerUnit,
            some(nutrient));
    }

    matchesUserDemographic(userDemographic: UserDemographic): boolean {
        let result = [
            this.sex.match({
                some: s => s == userDemographic.sex,
                none: () => true
            }),
            this.age.match({
                some: range => range.contains(userDemographic.age),
                none: () => true
            }),
            this.height.match({
                some: range => range.contains(userDemographic.height),
                none: () => true
            }),
            this.weight.match({
                some: range => range.contains(userDemographic.weight),
                none: () => true
            })
        ].reduce((a, b) => a && b);
        return result;
    }

    private getConsumption(userDemographic: UserDemographic, surveyResults: Food[]): Option<number> {
        let consumption = surveyResults
            .map(f => f.getConsumption(this.nutrientTypeId))
            .reduce((a, b) => a + b);
        if (this.nutrientRuleType == DemographicNutrientRuleTypeEnum.ENERGY_DIVIDED_BY_BMR) {
            return userDemographic.getBmr().map(bmr => consumption / bmr);
        } else if (this.nutrientRuleType == DemographicNutrientRuleTypeEnum.PER_UNIT_OF_WEIGHT) {
            return some(consumption / userDemographic.weight);
        } else if (this.nutrientRuleType == DemographicNutrientRuleTypeEnum.PERCENTAGE_OF_ENERGEY) {
            let energy = surveyResults.map(f => f.getEnergy()).reduce((a, b) => a + b);
            let v = this.nutrientTypeKCalPerUnit.match({
                    some: a => consumption * a,
                    none: () => 0
                }) * 100 / energy;
            return some(v);
        } else if (this.nutrientRuleType == DemographicNutrientRuleTypeEnum.RANGE) {
            return some(consumption);
        } else {
            return none;
        }
    }

    private getScaleSectorByValue(value: number): Option<DemographicScaleSector> {
        let scaleSectors = this.scaleSectors.filter(ss => ss.range.contains(value));
        return scaleSectors.length ? some(scaleSectors[0]) : none;
    }

    private getScaleSectorByBestSentiment(): Option<DemographicScaleSector> {
        let excScaleSectors = this.scaleSectors.filter(ss => ss.sentiment == DemographicScaleSectorSentimentEnum.EXCELLENT);
        if (excScaleSectors.length) {
            return some(excScaleSectors[0]);
        }
        let goodScaleSectors = this.scaleSectors.filter(ss => ss.sentiment == DemographicScaleSectorSentimentEnum.GOOD);
        if (goodScaleSectors.length) {
            return some(goodScaleSectors[0]);
        }
        return none;
    }

    private cloneWithCustomScalesectors(scaleSectors: DemographicScaleSector[]): DemographicGroup {
        return new DemographicGroup(this.id, this.nutrientTypeId, this.nutrientRuleType, scaleSectors,
            this.sex, this.age, this.height, this.weight, this.nutrientTypeKCalPerUnit,
            this.nutrient);
    }

}

export class DemographicResult {

    readonly resultedDemographicGroup: DemographicGroup;
    readonly targetDemographicGroup: DemographicGroup;
    readonly consumption: number;

    constructor(demographicGroup: DemographicGroup,
                targetDemographicGroup: DemographicGroup,
                consumption: number) {
        this.resultedDemographicGroup = demographicGroup.clone();
        this.targetDemographicGroup = targetDemographicGroup;
        this.consumption = consumption;
    }

    clone(): DemographicResult {
        return new DemographicResult(this.resultedDemographicGroup, this.targetDemographicGroup, this.consumption);
    }

}

export class DemographicScaleSector {

    readonly id: Option<number>;
    readonly name: string;
    readonly description: Option<string>;
    readonly sentiment: DemographicScaleSectorSentimentEnum;
    readonly range: DemographicRange;

    constructor(id: Option<number>, name: string, description: Option<string>,
                sentiment: DemographicScaleSectorSentimentEnum,
                range: DemographicRange) {
        this.id = id;
        this.name = name;
        this.sentiment = sentiment;
        this.range = range;
        this.description = description;
    }

    static fromJson(json: any): DemographicScaleSector {
        return new DemographicScaleSector(
            some(parseInt(json.id)),
            json.name,
            json.description.length ? some(json.description) : none,
            json.sentiment,
            DemographicRange.fromJson(json.range)
        )
    }

    clone(): DemographicScaleSector {
        return new DemographicScaleSector(this.id, this.name, this.description,
            this.sentiment, this.range);
    }

}

export class DemographicRange {

    readonly start: number;
    readonly end: number;

    constructor(start: number, end: number) {
        this.start = start;
        this.end = end;
    }


    static fromJson(json: any): DemographicRange {
        return new DemographicRange(parseFloat(json.start), parseFloat(json.end));
    }

    static fromOptionalJson(json: any[]): Option<DemographicRange> {
        return json.length ? some(DemographicRange.fromJson(json[0])) : none;
    }

    clone(): DemographicRange {
        return new DemographicRange(this.start, this.end);
    }

    contains(n: number): boolean {
        return n >= this.start && n < this.end;
    }

}

export class UserDemographic {
    readonly sex: DemographicSexEnum;
    readonly age: number;
    readonly height: number;
    readonly weight: number;
    private readonly bmrCalculator: HenryCoefficientsCalculator;

    constructor(sex: DemographicSexEnum,
                age: number,
                height: number,
                weight: number,
                bmrCalculator: HenryCoefficientsCalculator) {
        this.sex = sex;
        this.age = age;
        this.height = height;
        this.weight = weight;
        this.bmrCalculator = bmrCalculator
    }

    clone(): UserDemographic {
        return new UserDemographic(this.sex, this.age, this.height, this.weight, this.bmrCalculator);
    }

    getBmr(): Option<number> {
        return this.bmrCalculator.getBMR(this).map(n => Math.round(n * 100) / 100);
    }

}

export enum DemographicNutrientRuleTypeEnum {
    PERCENTAGE_OF_ENERGEY = <any>"percentage_of_energy",
    ENERGY_DIVIDED_BY_BMR = <any>"energy_divided_by_bmr",
    PER_UNIT_OF_WEIGHT = <any>"per_unit_of_weight",
    RANGE = <any>"range"
}

export enum DemographicScaleSectorSentimentEnum {
    TOO_LOW = <any>"too_low",
    LOW = <any>"low",
    BIT_LOW = <any>"bit_low",
    GOOD = <any>"good",
    EXCELLENT = <any>"excellent",
    BIT_HIGH = <any>"bit_high",
    HIGH = <any>"high",
    TOO_HIGH = <any>"too_high"
}

export enum DemographicSexEnum {
    FEMALE = <any>"f",
    MALE = <any>"m"
}
