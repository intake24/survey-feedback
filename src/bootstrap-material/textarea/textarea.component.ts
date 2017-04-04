import {Component} from '@angular/core';
import {getControlValueAccessor} from "../get-control-value-accessor";
import {BmControl} from "../bm-control.class";

@Component({
  selector: 'bm-textarea',
  templateUrl: 'textarea.component.html',
  styleUrls: ['textarea.component.scss'],
  providers: [getControlValueAccessor(BmTextareaComponent)]
})

export class BmTextareaComponent extends BmControl {

  constructor() {
    super();
  }

}
