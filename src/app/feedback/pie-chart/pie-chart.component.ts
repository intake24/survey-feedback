import {
  Component, OnInit, ElementRef, HostListener, Input, OnChanges, ChangeDetectionStrategy,
  trigger, state, style, transition, animate, keyframes, ChangeDetectorRef
} from '@angular/core';
import {WindowRefService} from "../../services/window-ref.service";


@Component({
  selector: 'i24-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger("popIn", [
      state("in", style({transform: "scale(1)", opacity: 1})),
      state("out", style({transform: "scale(0)", opacity: 0})),
      transition("out => in", [
        animate(300, keyframes([
          style({opacity: 0, transform: 'scale(0)'}),
          style({opacity: 1, transform: 'scale(1.1)'}),
          style({opacity: 1, transform: 'scale(1)'})
        ]))
      ])
    ])
  ]
})
export class PieChartComponent implements OnInit, OnChanges {

  @Input() animateDelay: number;
  @Input() data: PieChardData[];

  state: string;

  height: number;

  private _window: any;

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private elementRef: ElementRef,
              private windowRef: WindowRefService) {
    this._window = windowRef.nativeWindow;
  }

  @HostListener("window:scroll", ["$event"])
  onScroll(event) {
    this.setVisible();
  }

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.setSize();
  }

  ngOnInit() {
    this.setSize();
  }

  ngOnChanges(...args: any[]) {
    this.state = "out";
  }

  private setVisible(): void {
    if (this.animateDelay == null) {
      this.animateDelay = 100;
    }
    if (this.isElementInViewport(this.elementRef.nativeElement, this.windowRef.nativeWindow)) {
      setTimeout(() => {
        this.buildChart();
        this.changeDetectorRef.markForCheck();
      }, this.animateDelay);
    }

  }

  private isElementInViewport(el: HTMLElement, window: Window): boolean {

    let top = el.offsetTop;
    let height = el.offsetHeight;

    while (el.offsetParent) {
      el = <HTMLElement>el.offsetParent;
      top += el.offsetTop;
    }

    return (
      (window.pageYOffset <= top + height && top <= window.pageYOffset + window.innerHeight - 250)
    );
  }

  private buildChart() {

    if (!this.data || this.state == "in") {
      return;
    }

    this.state = "in";

    let canvas = this.elementRef.nativeElement.querySelector('canvas');

    new this._window.Chart(canvas, {
      type: "doughnut",
      data: {
        labels: this.data.map(d => d.label),
        datasets: [
          {
            data: this.data.map(d => d.value),
            backgroundColor: this.data.map(d => d.color),
            hoverBackgroundColor: this.data.map(d => d.color),
          }]
      },
      options: {
        legend: {
          display: false
        }
      }
    });
  }

  private setSize(): void {
    this.height = this.elementRef.nativeElement.childNodes[0].offsetWidth;
  }

}

export class PieChardData {

  value: number;
  label: string;
  color: string;

  constructor(value: number, label: string, color: string) {
    this.value = value;
    this.label = label;
    this.color = color;
  }

}
