import {NgModule} from '@angular/core';
import {Routes, RouterModule} from "@angular/router";
import {TokenLoginComponent} from "./token-login.component";

export const rootRouterConfig: Routes = [
  {path: "token-login/:token", component: TokenLoginComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(rootRouterConfig)
  ],
  exports: [
    RouterModule
  ]
})
export class TokenLoginRoutingModule {
}
