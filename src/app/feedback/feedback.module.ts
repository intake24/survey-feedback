import {NgModule, ValueProvider} from "@angular/core"
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";
import {LocationStrategy, HashLocationStrategy} from "@angular/common";
import {FoodSmileComponent} from "./food-smile/food-smile.component";
import {ResultListDietItemComponent} from "./result-list-diet-item/result-list-diet-item.component";
import {PlayingCardsComponent} from "./playing-cards/playing-cards.component";
import {PlayingCardComponent} from "./playing-card/playing-card.component";
import {UserDemographicInfoComponent} from "./user-demographic-info/user-demographic-info.component";
import {FeedbackRoutingModule} from "./feedback-routing.module";
import {ChartsModule} from "ng2-charts";
import {PieChartComponent} from './pie-chart/pie-chart.component';
import {LoaderComponent} from './loader/loader.component';
import {AnimatedListComponent} from "./animated-list/animated-list.component";
import {AnimateModule} from "../../animations/animate.module";
import { AppearInViewportComponent } from './appear-in-viewport/appear-in-viewport.component';


@NgModule({
  declarations: [
    FoodSmileComponent,
    ResultListDietItemComponent,
    PlayingCardsComponent,
    PlayingCardComponent,
    UserDemographicInfoComponent,
    PieChartComponent,
    LoaderComponent,
    AnimatedListComponent,
    AppearInViewportComponent
  ],
  imports: [BrowserModule,
    FormsModule,
    HttpModule,
    FeedbackRoutingModule,
    ChartsModule,
    AnimateModule],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: []
})
export class FeedbackModule {

}
