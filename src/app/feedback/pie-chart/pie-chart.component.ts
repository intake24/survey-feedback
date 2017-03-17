import {Component, OnInit, ElementRef, HostListener, Input, OnChanges} from '@angular/core';
import {WindowRefService} from "../../services/window-ref.service";


@Component({
  selector: 'i24-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit, OnChanges {

  @Input() data: PieChardData[];

  public doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData: number[] = [350, 450, 100];
  public doughnutChartType: string = 'doughnut';

  height: number;

  private _window: any;

  constructor(private elementRef: ElementRef,
              private windowRef: WindowRefService) {
    this._window = windowRef.nativeWindow;
  }

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.setSize();
  }

  ngOnInit() {
    this.setSize();
  }

  ngOnChanges(...args: any[]) {
    console.log(this.data);
    this.buildChart();
  }

  private buildChart() {

    if (!this.data) {
      return;
    }

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
