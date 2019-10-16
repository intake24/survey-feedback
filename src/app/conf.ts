import {environment} from '../environments/environment';

export class AppConfig {

  private static get windowRef(): any {
    return window;
  }

  // static readonly apiBaseUrl: string = environment.production ? `${AppConfig.windowRef.apiBaseUrl}/` : 'http://localhost:9001/';
  // static readonly surveyId: string = environment.production ? AppConfig.windowRef.surveyId : 'demo';
  static readonly apiBaseUrl: string = 'https://api.intake24.co.uk/';
  static readonly surveyId: string = 'demo';
  static readonly surveyPath: string = `/surveys/${AppConfig.surveyId}`;
  static readonly privacyUrl: string = 'https://www.cam.ac.uk/about-this-site/privacy-policy';
  static readonly termsUrl: string = 'https://www.cam.ac.uk/about-this-site/terms-and-conditions';

}
