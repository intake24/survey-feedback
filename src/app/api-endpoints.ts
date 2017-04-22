import {environment} from '../environments/environment';

export class ApiEndpoints {

  private static get windowRef(): any {
    return window;
  }

  static readonly baseUrl = environment.production ? ApiEndpoints.windowRef.apiBaseUrl : "http://api-test.intake24.co.uk/";
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
