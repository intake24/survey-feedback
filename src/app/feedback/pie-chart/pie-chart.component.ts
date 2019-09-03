import {ChangeDetectionStrategy, Component, ElementRef, HostListener, Input, OnChanges, OnInit} from '@angular/core';
import {WindowRefService} from '../../services/window-ref.service';
import {AnimateActionEnum} from '../../../animate-ts/animate-action.enum';

const MAX_LABEL_LENGTH = 20;

@Component({
  selector: 'i24-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PieChartComponent implements OnInit, OnChanges {

  chart: any;

  @Input() animateDelay: number;
  @Input() data: PieChardData[];
  @Input() showLabels: boolean;

  private appeared = false;

  height: number;

  animation = AnimateActionEnum.ZoomIn;

  private _window: any;

  constructor(private elementRef: ElementRef,
              private windowService: WindowRefService) {
    this._window = this.windowService.nativeWindow;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setSize();
  }

  ngOnInit() {
    this.setSize();
  }

  ngOnChanges() {
    if (this.chart != null) {
      this.chart.destroy();
      this.chart = null;
      this.buildChart();
    }
  }

  buildChart() {

    if (this.chart != null) {
      return;
    }

    const canvas = this.elementRef.nativeElement.querySelector('canvas');

    if (canvas) {
      const data = this.data.filter(d => d.value > 0);

      this.chart = new this._window.Chart(canvas, {
        type: 'doughnut',
        data: {
          labels: data.map(d => d.label.length >= MAX_LABEL_LENGTH ?
            d.label.slice(0, MAX_LABEL_LENGTH - 3) + '...' : d.label),
          datasets: [
            {
              data: data.map(d => d.value),
              backgroundColor: data.map(d => d.color),
              hoverBackgroundColor: data.map(d => d.color),
            }]
        },
        options: {
          legend: {
            display: false
          },
          tooltips: {
            enabled: this.showLabels
          }
        }
      });

      this.appeared = true;
    }

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
