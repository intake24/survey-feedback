import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {FeedbackModule} from "./feedback/feedback.module";
import {AppRoutingModule} from "./app-routing.module";
import {LocationStrategy, HashLocationStrategy} from "@angular/common";
import {CookieService} from "angular2-cookie/services/cookies.service";
import {SurveysService} from "./services/surveys.service";
import {DemographicGroupsService} from "./services/demographic-groups.service";
import {UserDemographicService} from "./services/user-demographic.service";
import {NutrientTypesService} from "./services/nutrient-types.service";
import {DictionariesService} from "./services/dictionaries.service";
import {UserStateService} from "./services/user-state.service";
import {AppHttp} from "./services/app-http.service";
import {WindowRefService} from "./services/window-ref.service";
import {WelcomeModule} from "./welcome/welcome.module";
import {UserInfoService} from "./services/user-info.service";
import {TokenLoginModule} from "./token-login/token-login.module";
import {HelpService} from "./services/help.service";
import {PhysicalActivityLevelsService} from "./services/physical-activity-levels.service";
import {WeightTargetsService} from "./services/weight-targets.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FeedbackModule,
    WelcomeModule,
    TokenLoginModule,
    AppRoutingModule
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    CookieService,
    SurveysService,
    DemographicGroupsService,
    UserDemographicService,
    NutrientTypesService,
    DictionariesService,
    UserStateService,
    AppHttp,
    WindowRefService,
    UserInfoService,
    HelpService,
    PhysicalActivityLevelsService,
    WeightTargetsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
