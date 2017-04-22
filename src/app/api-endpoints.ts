import {isDevMode} from "@angular/core";

export class ApiEndpoints {

  private static get windowRef(): any {
    return window;
  }

  static readonly baseUrl = isDevMode() ? "http://api-test.intake24.co.uk/" : ApiEndpoints.windowRef.apiBaseUrl;
  // static readonly baseUrl = "http://localhost:9000/";

  static refreshUserToken(): string {
    return ApiEndpoints.baseUrl + "refresh"
  };

  static demographicGroups(): string {
    return ApiEndpoints.baseUrl + "admin/demographic-groups";
  };

  static nutrientTypes(): string {
    return ApiEndpoints.baseUrl + "admin/nutrient-types";
  };

  static henryCoefficients(): string {
    return ApiEndpoints.baseUrl + "admin/henry-coefficients";
  };

  static mySurveyResults(surveyId: string): string {
    return ApiEndpoints.baseUrl + `surveys/${surveyId}/my-submissions`;
  }

  static myUserInfo(): string {
    return ApiEndpoints.baseUrl + `users/my-info`;
  }
}
