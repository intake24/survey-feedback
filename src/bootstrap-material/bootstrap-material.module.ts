import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BmInputComponent} from "./input/input.component";
import {FormsModule} from "@angular/forms";
import {BmWrapperComponent} from "./wrapper/wrapper.component";
import {BmTextareaComponent} from "./textarea/textarea.component";

@NgModule({
  imports: [
    CommonModule, FormsModule
  ],
  declarations: [BmInputComponent, BmTextareaComponent, BmWrapperComponent],
  exports: [BmInputComponent, BmTextareaComponent]
})
export class BootstrapMaterialModule { }
