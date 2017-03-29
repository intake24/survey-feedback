import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControlMaterialComponent} from "./form-control-material/form-control-material.component";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule, FormsModule
  ],
  declarations: [FormControlMaterialComponent],
  exports: [FormControlMaterialComponent]
})
export class BootstrapMaterialModule { }
