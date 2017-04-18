import {Component, Input} from '@angular/core';
import {getControlValueAccessor} from "../get-control-value-accessor";
import {BmControl} from "../bm-control.class";

@Component({
  selector: 'bm-select',
  templateUrl: 'select.component.html',
  styleUrls: ['select.component.scss'],
  providers: [getControlValueAccessor(BmSelectComponent)]
})

export class BmSelectComponent extends BmControl {

  @Input() placeholderValue: any;

  constructor() {
    super();
  }

}
