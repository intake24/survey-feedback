import {DemographicRange, DemographicSexEnum} from "./demographic-group.class";
import {UserDemographic} from "./user-demographic.class";


export class HenryCoefficientsCalculator {

  private readonly coefficients: HenryCoefficient[];

  constructor(henryCoefficients: HenryCoefficient[]) {
    this.coefficients = henryCoefficients.map(hc => hc.clone());
  }

  static fromJson(json: any[]): HenryCoefficientsCalculator {
    return new HenryCoefficientsCalculator(json.map(js => HenryCoefficient.fromJson(js)));
  }

  getBMR(userDemographic: UserDemographic): number {
    let coefs = this.coefficients.filter(c => c.matchesUserDemographic(userDemographic));

    if (!coefs.length) {
      throw new Error("Henry coefficients matching user demographic were not found");
    } else {
      return this.calculateBMR(userDemographic, coefs[0]);
    }
  }

  private calculateBMR(userDemographic: UserDemographic, hCoef: HenryCoefficient): number {

    return hCoef.weightCoefficient * userDemographic.weight +
      hCoef.heightCoefficient * (userDemographic.height / 100) + hCoef.constant;
  }

}


class HenryCoefficient {

  readonly sex: DemographicSexEnum;
  readonly ageRange: DemographicRange;
  readonly weightCoefficient: number;
  readonly heightCoefficient: number;
  readonly constant: number;

  constructor(sex: DemographicSexEnum, ageRange: DemographicRange, weightCoefficient: number,
              heightCoefficient: number, constant: number) {
    this.sex = sex;
    this.ageRange = ageRange.clone();
    this.weightCoefficient = weightCoefficient;
    this.heightCoefficient = heightCoefficient;
    this.constant = constant;
  }

  static fromJson(json: any): HenryCoefficient {
    return new HenryCoefficient(
      json.sex,
      new DemographicRange(json.ageRange.start, json.ageRange.end),
      parseFloat(json.weightCoefficient),
      parseFloat(json.heightCoefficient),
      parseFloat(json.constant)
    );
  }

  clone(): HenryCoefficient {
    return new HenryCoefficient(this.sex, this.ageRange, this.weightCoefficient,
      this.heightCoefficient, this.constant);
  }

  matchesUserDemographic(ud: UserDemographic): boolean {
    return this.sex == ud.sex &&
      this.ageRange.contains(ud.age);
  }

}
