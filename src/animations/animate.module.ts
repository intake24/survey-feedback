import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AnimateComponent} from "./animate.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  imports: [
    CommonModule, FormsModule, BrowserAnimationsModule
  ],
  declarations: [AnimateComponent],
  exports: [AnimateComponent]
})
export class AnimateModule {
}
