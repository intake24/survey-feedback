import {NgModule} from '@angular/core';
import {Routes, RouterModule} from "@angular/router";
import {WelcomeComponent} from "./welcome.component";

export const rootRouterConfig: Routes = [
  {path: "user-info", component: WelcomeComponent},
  {path: "thanks", component: WelcomeComponent},
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
