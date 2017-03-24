import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AnimateComponent} from "./animate.component";

@NgModule({
  imports: [
    CommonModule, FormsModule
  ],
  declarations: [AnimateComponent],
  exports: [AnimateComponent]
})
export class AnimateModule {
}
