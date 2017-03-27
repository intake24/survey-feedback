import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {FeedbackModule} from "./feedback/feedback.module";
import {AppRoutingModule} from "./app-routing.module";
import {LocationStrategy, HashLocationStrategy} from "@angular/common";
import {CookieService} from "angular2-cookie/services/cookies.service";
import {MySurveyResultsService} from "./services/my-survey-results.service";
import {DemographicGroupsService} from "./services/demographic-groups.service";
import {UserDemographicService} from "./services/user-demographic.service";
import {NutrientTypesService} from "./services/nutrient-types.service";
import {DictionariesService} from "./services/dictionaries.service";
import {UserStateService} from "./services/user-state.service";
import {AppHttp} from "./services/app-http.service";
import {WindowRefService} from "./services/window-ref.service";
import {WelcomeModule} from "./welcome/welcome.module";

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
    AppRoutingModule
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    CookieService,
    MySurveyResultsService,
    DemographicGroupsService,
    UserDemographicService,
    NutrientTypesService,
    DictionariesService,
    UserStateService,
    AppHttp,
    WindowRefService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
