import {Component} from '@angular/core';
import {getControlValueAccessor} from "../get-control-value-accessor";
import {BmControl} from "../bm-control.class";

@Component({
  selector: 'bm-input',
  templateUrl: 'input.component.html',
  styleUrls: ['input.component.scss'],
  providers: [getControlValueAccessor(BmInputComponent)]
})

export class BmInputComponent extends BmControl {

  constructor() {
    super();
  }

}
