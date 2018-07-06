import {AppConfig} from "./conf";

export class ApiEndpoints {

  private static get windowRef(): any {
    return window;
  }

  static readonly apiBaseUrl = AppConfig.apiBaseUrl;

  static loginWithToken(token: string): string {
    return `${ApiEndpoints.apiBaseUrl}signin/token/${token}`
  };

  static refreshUserToken(): string {
    return `${ApiEndpoints.apiBaseUrl}refresh`
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

  static physicalActivityLevels(): string {
    return `${ApiEndpoints.apiBaseUrl}admin/physical-activity-levels`;
  }

  static weightTargets(): string {
    return `${ApiEndpoints.apiBaseUrl}admin/weight-targets`;
  }

  static mySurveyResults(surveyId: string): string {
    return `${ApiEndpoints.apiBaseUrl}surveys/${surveyId}/my-submissions?compoundFoodGroups=1`;
  }

  static surveyFeedbackStyle(surveyId: string): string {
    return `${ApiEndpoints.apiBaseUrl}surveys/${surveyId}/feedback-style`;
  }

  static surveyFollowUp(surveyId: string): string {
    return `${ApiEndpoints.apiBaseUrl}surveys/${surveyId}/follow-up`;
  }

  static surveyPublicParameters(surveyId: string): string {
    return `${ApiEndpoints.apiBaseUrl}surveys/${surveyId}/public-parameters`;
  }

  static myPhysicalData(): string {
    return `${ApiEndpoints.apiBaseUrl}users/my-physical-data`;
  }

  static myProfile(): string {
    return `${ApiEndpoints.apiBaseUrl}users/my-profile`;
  }

  static helpFeedback(): string {
    return `${ApiEndpoints.apiBaseUrl}help/feedback`;
  }

  static fiveADayFeedback(): string {
    return `${ApiEndpoints.apiBaseUrl}user/feedback/five-a-day`;
  }

  static foodGroupsFeedback(): string {
    return `${ApiEndpoints.apiBaseUrl}user/feedback/food-groups`;
  }
}
