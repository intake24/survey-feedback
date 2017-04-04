import {Component, Input} from '@angular/core';

@Component({
  selector: 'bm-wrapper',
  templateUrl: 'wrapper.component.html',
  styleUrls: ['wrapper.component.scss']
})

export class BmWrapperComponent {

  @Input() filled: boolean;
  @Input() focused: boolean;
  @Input() label: string;

}
