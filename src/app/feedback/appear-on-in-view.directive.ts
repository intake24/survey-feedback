import {Directive, ElementRef, HostListener} from '@angular/core';
import {WindowRefService} from "../services/window-ref.service";
import Timer = NodeJS.Timer;

@Directive({
  selector: '[i24AppearOnInView]'
})
export class AppearOnInViewDirective {

  private scrollTimer: Timer;

  constructor(private elementRef: ElementRef,
              private windowRef: WindowRefService) {
    this.isElementInViewport(this.elementRef.nativeElement, this.windowRef.nativeWindow);
  }

  @HostListener("window:scroll", ["$event"])
  onScroll(event) {
    clearTimeout(this.scrollTimer);
    this.scrollTimer = setTimeout(() => this.isElementInViewport(this.elementRef.nativeElement, this.windowRef.nativeWindow), 500);
  }

  private isElementInViewport(el: HTMLElement, window: Window): boolean {

    let top = el.offsetTop;
    let left = el.offsetLeft;
    let width = el.offsetWidth;
    let height = el.offsetHeight;

    while (el.offsetParent) {
      el = <HTMLElement>el.offsetParent;
      top += el.offsetTop;
      left += el.offsetLeft;
    }

    return (
      (window.pageYOffset <= top + height && top <= window.pageYOffset + window.innerHeight) &&
      (window.pageXOffset <= left + width && left <= window.pageXOffset + window.innerWidth)
    );
  }

}
