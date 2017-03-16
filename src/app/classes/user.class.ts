import {Option} from "ts-option";

export class User {
    readonly userName: string;
    readonly surveyId: Option<string>;
    readonly roles: string[];

    constructor(userName: string, surveyId: Option<string>, roles: string[]) {
        this.userName = userName;
        this.surveyId = surveyId;
        this.roles = roles.slice();
    }
}