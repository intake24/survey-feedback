import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output, ViewChild
} from '@angular/core';
import {WindowRefService} from "../../services/window-ref.service";
import {AnimateActionEnum} from "../../../animate-ts/animate-action.enum";
import {FeedbackCardComponent} from "../feedback-card/feedback-card";

@Component({
  selector: 'i24-appear-in-viewport',
  templateUrl: './appear-in-viewport.component.html',
  styleUrls: ['./appear-in-viewport.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppearInViewportComponent implements OnInit, OnChanges {

  action: AnimateActionEnum = AnimateActionEnum.Hidden;

  private _previousVisible: boolean;
  isVisible: boolean;

  @Input() scrollOffset: number;
  @Input() animationDelay: number;
  @Input() animation: AnimateActionEnum;

  @Output() enteredViewport: EventEmitter<any> = new EventEmitter();
  @Output() leftViewport: EventEmitter<any> = new EventEmitter();

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private elementRef: ElementRef,
              private windowRef: WindowRefService) {
  }

  @HostListener("window:scroll", ["$event"])
  onScroll(event) {
    this.setVisible();
  }

  ngOnChanges(): void {
    this.scrollOffset = this.scrollOffset != null ? this.scrollOffset : 0;
    this.animationDelay = this.animationDelay != null ? this.animationDelay : 0;
  }

  ngOnInit(): void {
    setTimeout(() => this.setVisible());
  }

  private setVisible(): void {
    this.isVisible = this.isElementInViewport(this.elementRef.nativeElement, this.windowRef.nativeWindow);
    if (this.isVisible != this._previousVisible) {
      this._previousVisible = this.isVisible;
      if (this.isVisible) {
        setTimeout(() => {
          this.action = this.animation;
          this.changeDetectorRef.markForCheck();
          this.enteredViewport.emit();
        }, this.animationDelay);
      } else {
        this.leftViewport.emit();
      }
    }
  }

  private isElementInViewport(el: HTMLElement, window: Window): boolean {

    let top = el.offsetTop;
    let height = el.offsetHeight;
    let parEl = el;

    while (parEl.offsetParent) {
      parEl = <HTMLElement>parEl.offsetParent;
      top += parEl.offsetTop;
    }

    return window.pageYOffset <= top + height &&
      top <= window.pageYOffset + window.innerHeight - this.scrollOffset;
  }

}
