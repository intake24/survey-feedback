import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {FoodSmileComponent} from "./food-smile/food-smile.component";

@NgModule({
  imports: [
    CommonModule, FormsModule
  ],
  declarations: [FoodSmileComponent],
  exports: [FoodSmileComponent]
})
export class SharedModule {
}
