import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {AnimateActionEnum} from "../../../animations/animate-action.enum";
import {AnimateFrame} from "../../../animations/animate-frame.class";

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

  currentDayAnimation: AnimateFrame[];
  previousDayAnimation: AnimateFrame[];

  constructor() {
    this.currentDayAnimation = [new AnimateFrame(AnimateActionEnum.Visible)];
    this.previousDayAnimation = [new AnimateFrame(AnimateActionEnum.Hidden)];
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

  private getDayTitle(): string {
    return this.dayNumber != null ? 'Day ' + (this.dayNumber + 1) : 'All days';
  }

  private animateWrapper(fn): void {
    this.previousDayNumber = this.dayNumber;
    this.previousDayTitle = this.currentDayTitle;
    fn();
    this.currentDayTitle = this.getDayTitle();
    this.previousDayAnimation = [new AnimateFrame(AnimateActionEnum.Visible)];
    this.currentDayAnimation = [new AnimateFrame(AnimateActionEnum.Hidden)];
    if (this.previousDayNumber != null && (this.dayNumber == null || this.dayNumber > this.previousDayNumber)) {
      this.previousDayAnimation.push(new AnimateFrame(AnimateActionEnum.FadeOutRight));
      this.currentDayAnimation.push(new AnimateFrame(AnimateActionEnum.FadeInLeft));
    } else {
      this.previousDayAnimation.push(new AnimateFrame(AnimateActionEnum.FadeOutLeft));
      this.currentDayAnimation.push(new AnimateFrame(AnimateActionEnum.FadeInRight));
    }
  }

}
