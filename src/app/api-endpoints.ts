import {AppConfig} from "./conf";

export class ApiEndpoints {

  private static get windowRef(): any {
    return window;
  }

  static readonly apiBaseUrl = AppConfig.apiBaseUrl;

  static refreshUserToken(): string {
    return  `${ApiEndpoints.apiBaseUrl}refresh`
  };

  static demographicGroups(): string {
    return `${ApiEndpoints.apiBaseUrl}admin/demographic-groups`;
  };

  static nutrientTypes(): string {
    return `${ApiEndpoints.apiBaseUrl}admin/nutrient-types`;
  };

  static henryCoefficients(): string {
    return `${ApiEndpoints.apiBaseUrl}admin/henry-coefficients`;
  };

  static mySurveyResults(surveyId: string): string {
    return  `${ApiEndpoints.apiBaseUrl}surveys/${surveyId}/my-submissions`;
  }

  static myUserInfo(): string {
    return  `${ApiEndpoints.apiBaseUrl}users/my-info`;
  }
}
