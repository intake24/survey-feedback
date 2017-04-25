import {Option} from "ts-option";
import {OptionToRequest} from "../utils/option-to-request";

export class SurveyPublicParameters {

  localeId: string;
  supportEmail: string;
  originatingURL: Option<string>;

  constructor(localeId: string, supportEmail: string, originatingURL: Option<string>) {
    this.localeId = localeId;
    this.supportEmail = supportEmail;
    this.originatingURL = originatingURL;
  }

  static fromJson(json: any): SurveyPublicParameters {
    return new SurveyPublicParameters(json.localeId, json.supportEmail,
      OptionToRequest.fromJson<string>(json.originatingURL));
  }

  clone(): SurveyPublicParameters {
    return new SurveyPublicParameters(this.localeId, this.supportEmail, this.originatingURL);
  }

}
