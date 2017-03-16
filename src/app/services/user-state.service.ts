import {Injectable} from "@angular/core";
import {CookieService} from "angular2-cookie/core";
import {Option, none, some} from "ts-option";
import {User} from "../classes/user.class";

@Injectable()
export class UserStateService {

    private readonly ACCESS_TOKEN_COOKIE_NAME: string = "accessToken";
    private readonly REFRESH_TOKEN_COOKIE_NAME: string = "refreshToken";

    constructor(private cookieService: CookieService) {
    }

    setAccessToken(token: string): void {
        this.cookieService.put(this.ACCESS_TOKEN_COOKIE_NAME, token);
    }

    setRefreshToken(token: string): void {
        this.cookieService.put(this.REFRESH_TOKEN_COOKIE_NAME, token);
    }

    getAccessToken(): string {
        return this.cookieService.get(this.ACCESS_TOKEN_COOKIE_NAME);
    }

    getRefreshToken(): string {
        return this.cookieService.get(this.REFRESH_TOKEN_COOKIE_NAME);
    }

    getSurveyId(): Option<string> {
        return this.getCredentialsFromToken().flatMap(uc => uc.surveyId);
    }

    private getCredentialsFromToken(): Option<User> {
        try {
            let tokenPart = this.getAccessToken().split(".")[1],
                parsedToken = JSON.parse(atob(tokenPart)),
                credentials = JSON.parse(atob(parsedToken.sub)),
                providerParts = credentials.providerKey.split("#");

            if (providerParts.length < 2) {
                return some(new User(providerParts[0], none, parsedToken.i24r));
            } else {
                return some(new User(providerParts[1], some(providerParts[0]), parsedToken.i24r));
            }
        } catch (e) {
            return none;
        }
    }

}
