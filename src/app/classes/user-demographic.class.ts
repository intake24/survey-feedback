import {DemographicSexEnum} from "./demographic-group.class";
import {HenryCoefficientsCalculator} from "./henry-coefficient.class";
import {UserInfo} from "./user-info.class";
import {Option, none, some} from "ts-option";

export class UserDemographic {
  readonly name: string;
  readonly sex: DemographicSexEnum;
  readonly yearOfBirth: number;
  readonly age: number;
  readonly height: number;
  readonly weight: number;
  private readonly bmrCalculator: HenryCoefficientsCalculator;

  constructor(name: string,
              sex: DemographicSexEnum,
              yearOfBirth: number,
              age: number,
              height: number,
              weight: number,
              bmrCalculator: HenryCoefficientsCalculator) {
    this.name = name;
    this.sex = sex;
    this.yearOfBirth = yearOfBirth;
    this.age = age;
    this.height = height;
    this.weight = weight;
    this.bmrCalculator = bmrCalculator
  }

  clone(): UserDemographic {
    return new UserDemographic(this.name, this.sex, this.yearOfBirth,
      this.age, this.height, this.weight, this.bmrCalculator);
  }

  getBmr(): number {
    return Math.round(this.bmrCalculator.getBMR(this) * 100) / 100;
  }

  static fromUserInfo(userInfo: UserInfo, hc: HenryCoefficientsCalculator): Option<UserDemographic> {
    if (userInfo.firstName.isEmpty ||
      userInfo.sex.isEmpty ||
      userInfo.birthdate.isEmpty ||
      userInfo.weight.isEmpty ||
      userInfo.height.isEmpty) {
      return none;
    } else {
      return some(new UserDemographic(userInfo.firstName.get, userInfo.sex.get,
        userInfo.birthdate.get.getFullYear(),
        (new Date()).getFullYear() - userInfo.birthdate.get.getFullYear(),
        userInfo.height.get, userInfo.weight.get, hc));
    }
  }

}
