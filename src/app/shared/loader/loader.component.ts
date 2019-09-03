import {Component, Input, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger, } from '@angular/animations';

@Component({
  selector: 'i24-loader',
  templateUrl: 'loader.component.html',
  styleUrls: ['loader.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('visible', style({
        opacity: 1
      })),
      transition('void => *', animate(500, style({opacity: 0})))
    ])
  ]
})
export class LoaderComponent implements OnInit {

  @Input() isVisible: boolean;

  constructor() {
  }

  ngOnInit() {
  }

}
