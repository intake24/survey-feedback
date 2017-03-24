import {
  Component, OnInit, ElementRef, HostListener, Input, ChangeDetectionStrategy
} from '@angular/core';
import {AnimateActionEnum} from "../../../animations/animate-action.enum";
import {WindowRefService} from "../../services/window-ref.service";


@Component({
  selector: 'i24-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PieChartComponent implements OnInit {

  @Input() animateDelay: number;
  @Input() data: PieChardData[];

  private built: boolean = false;

  height: number;

  animation: AnimateActionEnum = AnimateActionEnum.ZoomIn;

  private _window: any;

  constructor(private elementRef: ElementRef,
              private windowService: WindowRefService) {
    this._window = this.windowService.nativeWindow;
  }

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.setSize();
  }

  ngOnInit() {
    this.setSize();
  }

  buildChart() {

    if (this.built) {
      return;
    }
    this.built = true;

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
