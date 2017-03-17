import {Component, OnInit, trigger, state, style, transition, animate, Input} from '@angular/core';

@Component({
  selector: 'i24-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({opacity: 0}),
        animate(100, style({opacity: 1}))
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(100, style({opacity: 0}))
      ])
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
