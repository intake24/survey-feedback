import {Component, OnInit} from '@angular/core';
import {AnimateActionEnum} from "../../../animations/animate-action.enum";

@Component({
  selector: 'i24-icon-frame',
  templateUrl: './icon-frame.component.html',
  styleUrls: ['./icon-frame.component.scss']
})
export class IconFrameComponent implements OnInit {

  animation: AnimateActionEnum;

  constructor() {
    this.animation = AnimateActionEnum.Hidden;
  }

  ngOnInit() {
    this.animation = AnimateActionEnum.ZoomIn;
  }

}
