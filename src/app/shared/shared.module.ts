import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {FoodSmileComponent} from "./food-smile/food-smile.component";
import {LoaderComponent} from "./loader/loader.component";

@NgModule({
  imports: [
    CommonModule, FormsModule
  ],
  declarations: [FoodSmileComponent, LoaderComponent],
  exports: [FoodSmileComponent, LoaderComponent]
})
export class SharedModule {
}
