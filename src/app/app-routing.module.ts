import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

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

