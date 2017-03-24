import {OnChanges, Input} from "@angular/core";

export class VisibilityControl implements OnChanges {

  @Input() isVisible: boolean;

  state: string;

  constructor() {
    this.state = "hidden";
  }

  ngOnChanges() {
    this.state = this.isVisible ? "visible" : "hidden";
  }

}
