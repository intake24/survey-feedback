import {NgModule} from '@angular/core';
import {Routes, RouterModule} from "@angular/router";
import {WelcomeComponent} from "./welcome.component";
import {FeedbackComponent} from "./feedback/feedback.component";

export const rootRouterConfig: Routes = [
  {path: "thanks", component: WelcomeComponent},
  {path: "feedback", component: FeedbackComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(rootRouterConfig)
  ],
  exports: [
    RouterModule
  ]
})
export class WelcomeRoutingModule {
}
