import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

export const rootRouterConfig: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot(rootRouterConfig)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}

