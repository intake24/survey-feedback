export class User {
  readonly userName: string;
  readonly surveyId: string;
  readonly roles: string[];

  constructor(userName: string, surveyId: string, roles: string[]) {
    this.userName = userName;
    this.surveyId = surveyId;
    this.roles = roles.slice();
  }
}
