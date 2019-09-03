import {Input} from '@angular/core';
import {ControlValueAccessor} from '@angular/forms';

const noop = () => {
};

export class BmControl implements ControlValueAccessor {

  @Input() label: string;

  focused: boolean;

  //The internal data model
  private innerValue: any = '';

  //Placeholders for the callbacks which are later providesd
  //by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  //get accessor
  get value(): any {
    return this.innerValue;
  };

  //set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  getFilled(): boolean {
    return this.innerValue != null && this.innerValue != '';
  }

  onFocus() {
    this.focused = true;
  }

  //Set touched on blur
  onBlur() {
    this.focused = false;
    this.onTouchedCallback();
  }

  //From ControlValueAccessor interface
  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

}
