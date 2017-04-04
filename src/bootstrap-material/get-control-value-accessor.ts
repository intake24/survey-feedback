import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {forwardRef} from "@angular/core";

export function getControlValueAccessor(component): any {
  return {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => component),
    multi: true
  };
}
