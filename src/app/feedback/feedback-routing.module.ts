import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { PlayingCardsComponent } from "./playing-cards/playing-cards.component";

export const rootRouterConfig:Routes = [
    {path: "", component: PlayingCardsComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(rootRouterConfig)
  ],
  exports: [
    RouterModule
  ]
})
export class FeedbackRoutingModule {}