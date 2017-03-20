import {Directive, ElementRef, HostListener, Input, Renderer} from '@angular/core';
import {WindowRefService} from "../services/window-ref.service";

@Directive({
  selector: '[i24AppearOnScrollIn]'
})
export class AppearOnScrollInDirective {

  constructor(private renderer: Renderer,
              private elementRef: ElementRef,
              private windowRef: WindowRefService) {
    this.setElementClass(this.elementRef.nativeElement, this.windowRef.nativeWindow);
  }

  @HostListener("window:scroll", ["$event"])
  onScroll(event) {
    this.setElementClass(this.elementRef.nativeElement, this.windowRef.nativeWindow);
  }

  private setElementClass(el: HTMLElement, window: Window): void {
    console.log(this.isElementInViewport(el, window));

    // this.renderer.setElementClass(el, "in", this.isElementInViewport(el, window));
  }

  private isElementInViewport(el: HTMLElement, window: Window): boolean {

    let top = el.offsetTop;
    let height = el.offsetHeight;

    while (el.offsetParent) {
      el = <HTMLElement>el.offsetParent;
      top += el.offsetTop;
    }

    return (
      (window.pageYOffset <= top + height && top <= window.pageYOffset + window.innerHeight)
    );
  }

}
