import {DemographicSexEnum} from "./demographic-group.class";
import {HenryCoefficientsCalculator} from "./henry-coefficient.class";
import {PhysicalActivityLevel} from "./physical-activity-level.class";
import {WeightTarget} from "../services/weight-targets.service";

export class UserDemographic {
  readonly name: string;
  readonly sex: DemographicSexEnum;
  readonly yearOfBirth: number;
  readonly age: number;
  readonly height: number;
  readonly weight: number;
  readonly weighTarget: WeightTarget;
  readonly physicalActivity: PhysicalActivityLevel;
  private readonly bmrCalculator: HenryCoefficientsCalculator;

  constructor(name: string,
              sex: DemographicSexEnum,
              yearOfBirth: number,
              age: number,
              height: number,
              weight: number,
              weighTarget: WeightTarget,
              physicalActivity: PhysicalActivityLevel,
              bmrCalculator: HenryCoefficientsCalculator) {
    this.name = name;
    this.sex = sex;
    this.yearOfBirth = yearOfBirth;
    this.age = age;
    this.height = height;
    this.weight = weight;
    this.weighTarget = weighTarget;
    this.physicalActivity = physicalActivity;
    this.bmrCalculator = bmrCalculator
  }

  clone(): UserDemographic {
    return new UserDemographic(this.name, this.sex, this.yearOfBirth,
      this.age, this.height, this.weight, this.weighTarget, this.physicalActivity, this.bmrCalculator);
  }

  getBmr(): number {
    return Math.round(this.bmrCalculator.getBMR(this) * 10) / 10;
  }

  getEnergyRequirement(): number {
    return Math.round((this.getBmr() * this.physicalActivity.coefficient + this.weighTarget.coefficient) * 10) / 10;
  }

}
