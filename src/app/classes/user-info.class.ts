import {Option, some, none} from "ts-option";
import {DemographicSexEnum} from "./demographic-group.class";
import {OptionToRequest} from "../utils/option-to-request";

export class UserInfo {

  userId: Option<number>;
  firstName: Option<string>;
  sex: Option<DemographicSexEnum>;
  birthdate: Option<Date>;
  weight: Option<number>;
  height: Option<number>;
  levelOfPhysicalActivityId: Option<number>;

  constructor(userId: Option<number>,
              firstName: Option<string>,
              sex: Option<DemographicSexEnum>,
              birthdate: Option<Date>,
              weight: Option<number>,
              height: Option<number>,
              levelOfPhysicalActivityId: Option<number>) {
    this.userId = userId;
    this.firstName = firstName;
    this.sex = sex;
    this.birthdate = birthdate;
    this.weight = weight;
    this.height = height;
    this.levelOfPhysicalActivityId = levelOfPhysicalActivityId;
  }

  toJsonRequest(): any {
    return {
      firstName: OptionToRequest.toRequest(this.firstName),
      sex: OptionToRequest.toRequest(this.sex),
      birthdate: this.birthdate.match({
        some: d => [d.toISOString()],
        none: () => []
      }),
      weight: OptionToRequest.toRequest(this.weight),
      height: OptionToRequest.toRequest(this.height),
      levelOfPhysicalActivityId: OptionToRequest.toRequest(this.levelOfPhysicalActivityId)
    }
  }

  static fromJson(js: any): UserInfo {
    return new UserInfo(
      some(js.userId),
      OptionToRequest.fromJson<string>(js.firstName),
      OptionToRequest.fromJson<DemographicSexEnum>(js.sex),
      OptionToRequest.fromJson<string>(js.birthdate).match({
        some: st => some(new Date(st)),
        none: () => none
      }),
      OptionToRequest.fromJson<number>(js.weight),
      OptionToRequest.fromJson<number>(js.height),
      OptionToRequest.fromJson<number>(js.levelOfPhysicalActivityId)
    );
  }

}
