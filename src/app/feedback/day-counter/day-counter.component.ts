import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AnimateFrame} from '../../../animate-ts/animate-frame';
import {AnimateActionEnum} from '../../../animate-ts/animate-action.enum';

@Component({
  selector: 'i24-day-counter',
  templateUrl: './day-counter.component.html',
  styleUrls: ['./day-counter.component.scss']
})
export class DayCounterComponent implements OnInit {

  @Input() dayNumber: number;
  @Output() dayNumberChange: EventEmitter<number> = new EventEmitter();

  @Input() totalDays: number;

  previousDayNumber: number;

  currentDayTitle: string;
  previousDayTitle: string;

  currentDayAnimation = AnimateActionEnum.Visible;
  previousDayAnimation = AnimateActionEnum.Hidden;

  constructor() {
  }

  ngOnInit() {
    this.currentDayTitle = this.getDayTitle();
  }

  nextDay(): void {
    if (this.dayNumber == null) {
      return;
    }
    this.animateWrapper(() => {
      if (this.dayNumber < this.totalDays - 1) {
        this.dayNumber++;
      } else {
        this.dayNumber = null;
      }
    });
    this.dayNumberChange.emit(this.dayNumber);
  }

  previousDay(): void {
    if (this.dayNumber == 0) {
      return;
    }
    this.animateWrapper(() => {
      if (this.dayNumber == null) {
        this.dayNumber = this.totalDays - 1;
      } else if (this.dayNumber > 0) {
        this.dayNumber--;
      }
    });
    this.dayNumberChange.emit(this.dayNumber);
  }

  resetAnimations() {
    this.currentDayAnimation = AnimateActionEnum.Visible;
    this.previousDayAnimation = AnimateActionEnum.Hidden;
  }

  private getDayTitle(): string {
    return this.dayNumber != null ? 'Day ' + (this.dayNumber + 1) : 'All days';
  }

  private animateWrapper(fn): void {
    this.previousDayNumber = this.dayNumber;
    this.previousDayTitle = this.currentDayTitle;
    fn();
    this.currentDayTitle = this.getDayTitle();
    if (this.previousDayNumber != null && (this.dayNumber == null || this.dayNumber > this.previousDayNumber)) {
      this.previousDayAnimation = AnimateActionEnum.FadeOutRight;
      this.currentDayAnimation = AnimateActionEnum.FadeInLeft;
    } else {
      this.previousDayAnimation = AnimateActionEnum.FadeOutLeft;
      this.currentDayAnimation = AnimateActionEnum.FadeInRight;
    }
  }

}
