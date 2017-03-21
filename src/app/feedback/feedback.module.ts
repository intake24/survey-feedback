import {NgModule, ValueProvider} from "@angular/core"
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";
import {LocationStrategy, HashLocationStrategy} from "@angular/common";
import {ResultListComponent} from "./result-list/result-list.component";
import {FoodSmileComponent} from "./food-smile/food-smile.component";
import {ResultListItemComponent} from "./result-list-item/result-list-item.component";
import {ResultListDietItemComponent} from "./result-list-diet-item/result-list-diet-item.component";
import {PlayingCardsComponent} from "./playing-cards/playing-cards.component";
import {PlayingCardComponent} from "./playing-card/playing-card.component";
import {UserDemographicInfoComponent} from "./user-demographic-info/user-demographic-info.component";
import {FeedbackRoutingModule} from "./feedback-routing.module";
import {ChartsModule} from "ng2-charts";
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { LoaderComponent } from './loader/loader.component';
import {AnimatedListComponent} from "./animated-list/animated-list.component";
import { AnimatedTextComponent } from './animated-text/animated-text.component';
import { PopOutComponent } from './pop-out/pop-out.component';


@NgModule({
  declarations: [
    ResultListComponent,
    FoodSmileComponent,
    ResultListItemComponent,
    ResultListDietItemComponent,
    PlayingCardsComponent,
    PlayingCardComponent,
    UserDemographicInfoComponent,
    PieChartComponent,
    LoaderComponent,
    AnimatedListComponent,
    AnimatedTextComponent,
    PopOutComponent
  ],
  imports: [BrowserModule, FormsModule, HttpModule, FeedbackRoutingModule, ChartsModule],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: []
})
export class FeedbackModule {

}
