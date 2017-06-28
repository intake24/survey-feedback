import {NgModule, ValueProvider} from "@angular/core"
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";
import {LocationStrategy, HashLocationStrategy} from "@angular/common";
import {ResultListDietItemComponent} from "./result-list-diet-item/result-list-diet-item.component";
import {PlayingCardsComponent} from "./playing-cards/playing-cards.component";
import {PlayingCardComponent} from "./playing-card/playing-card.component";
import {FeedbackRoutingModule} from "./feedback-routing.module";
import {ChartsModule} from "ng2-charts";
import {PieChartComponent} from './pie-chart/pie-chart.component';
import {AnimatedListComponent} from "./animated-list/animated-list.component";
import {AnimateModule} from "../../animations/animate.module";
import {AppearInViewportComponent} from './appear-in-viewport/appear-in-viewport.component';
import {SharedModule} from "../shared/shared.module";
import {TellMeMoreComponent} from "./tell-me-more/tell-me-more.component";
import {FeedbackHelpfulComponent} from "./feedback-helpful/feedback-helpful.component";
import {BootstrapMaterialModule} from "../../bootstrap-material/bootstrap-material.module";
import {UserDemographicInfoComponent} from "./user-demographic-info/user-demographic-info.component";
import { DayCounterComponent } from './day-counter/day-counter.component';
import { ConsentAlertComponent } from './consent-alert/consent-alert.component';
import { ScrollIconComponent } from './scroll-icon/scroll-icon.component';


@NgModule({
  declarations: [
    ResultListDietItemComponent,
    PlayingCardsComponent,
    PlayingCardComponent,
    UserDemographicInfoComponent,
    PieChartComponent,
    AnimatedListComponent,
    AppearInViewportComponent,
    TellMeMoreComponent,
    FeedbackHelpfulComponent,
    DayCounterComponent,
    ConsentAlertComponent,
    ScrollIconComponent
  ],
  imports: [BrowserModule,
    FormsModule,
    HttpModule,
    FeedbackRoutingModule,
    ChartsModule,
    AnimateModule,
    SharedModule,
    BootstrapMaterialModule],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: []
})
export class FeedbackModule {

}
