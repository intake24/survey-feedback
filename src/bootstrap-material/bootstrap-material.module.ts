import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BmInputComponent} from './input/input.component';
import {FormsModule} from '@angular/forms';
import {BmWrapperComponent} from './wrapper/wrapper.component';
import {BmTextareaComponent} from './textarea/textarea.component';
import {BmSelectComponent} from './select/select.component';

@NgModule({
  imports: [
    CommonModule, FormsModule
  ],
  declarations: [BmInputComponent, BmTextareaComponent, BmSelectComponent, BmWrapperComponent],
  exports: [BmInputComponent, BmTextareaComponent, BmSelectComponent]
})
export class BootstrapMaterialModule {
}
