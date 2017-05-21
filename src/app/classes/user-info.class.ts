import {Option, some} from "ts-option";
import {DemographicSexEnum} from "./demographic-group.class";
import {OptionToRequest} from "../utils/option-to-request";

export class UserInfo {

  userId: Option<number>;
  name: Option<string>;
  sex: Option<DemographicSexEnum>;
  birthdate: Option<Date>;
  weight: Option<number>;
  weightTarget: Option<string>;
  height: Option<number>;
  physicalActivityLevelId: Option<number>;

  email: Option<string>;
  emailNotifications: boolean;
  phone: Option<string>;
  smsNotifications: boolean;

  constructor(userId: Option<number>,
              name: Option<string>,
              sex: Option<DemographicSexEnum>,
              birthdate: Option<Date>,
              weight: Option<number>,
              weightTarget: Option<string>,
              height: Option<number>,
              physicalActivityLevelId: Option<number>,

              email: Option<string>,
              emailNotifications: boolean,
              phone: Option<string>,
              smsNotifications: boolean) {
    this.userId = userId;
    this.name = name;
    this.sex = sex;
    this.birthdate = birthdate;
    this.weight = weight;
    this.weightTarget = weightTarget;
    this.height = height;
    this.physicalActivityLevelId = physicalActivityLevelId;

    this.email = email;
    this.emailNotifications = emailNotifications;
    this.phone = phone;
    this.smsNotifications = smsNotifications;
  }

  static fromJson(js: any): UserInfo {
    return new UserInfo(
      some(js.userProfile.id),
      OptionToRequest.fromJson<string>(js.userProfile.name),
      OptionToRequest.fromJson<any>(js.physicalData).flatMap(pd => OptionToRequest.fromJson<DemographicSexEnum>(pd.sex)),
      OptionToRequest.fromJson<any>(js.physicalData)
        .flatMap(pd => OptionToRequest.fromJson<string>(pd.birthdate).map(bd => new Date(bd))),
      OptionToRequest.fromJson<any>(js.physicalData).flatMap(pd => OptionToRequest.fromJson<number>(pd.weight)),
      OptionToRequest.fromJson<any>(js.physicalData).flatMap(pd => OptionToRequest.fromJson<string>(pd.weightTarget)),
      OptionToRequest.fromJson<any>(js.physicalData).flatMap(pd => OptionToRequest.fromJson<number>(pd.height)),
      OptionToRequest.fromJson<any>(js.physicalData).flatMap(pd => OptionToRequest.fromJson<number>(pd.physicalActivityLevelId)),
      OptionToRequest.fromJson<string>(js.userProfile.email),
      js.userProfile.emailNotifications,
      OptionToRequest.fromJson<string>(js.userProfile.phone),
      js.userProfile.smsNotifications
    );
  }

}
