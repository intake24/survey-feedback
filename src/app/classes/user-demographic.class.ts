import {DemographicSexEnum} from "./demographic-group.class";
import {HenryCoefficientsCalculator} from "./henry-coefficient.class";
import {PhysicalActivityLevel} from "./physical-activity-level.class";

export class UserDemographic {
  readonly name: string;
  readonly sex: DemographicSexEnum;
  readonly yearOfBirth: number;
  readonly age: number;
  readonly height: number;
  readonly weight: number;
  readonly physicalActivity: PhysicalActivityLevel;
  private readonly bmrCalculator: HenryCoefficientsCalculator;

  constructor(name: string,
              sex: DemographicSexEnum,
              yearOfBirth: number,
              age: number,
              height: number,
              weight: number,
              physicalActivity: PhysicalActivityLevel,
              bmrCalculator: HenryCoefficientsCalculator) {
    this.name = name;
    this.sex = sex;
    this.yearOfBirth = yearOfBirth;
    this.age = age;
    this.height = height;
    this.weight = weight;
    this.physicalActivity = physicalActivity;
    this.bmrCalculator = bmrCalculator
  }

  clone(): UserDemographic {
    return new UserDemographic(this.name, this.sex, this.yearOfBirth,
      this.age, this.height, this.weight, this.physicalActivity, this.bmrCalculator);
  }

  getBmr(): number {
    return Math.round(this.bmrCalculator.getBMR(this) * 10) / 10;
  }

}
