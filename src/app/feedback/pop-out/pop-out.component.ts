import {
  Component, OnInit, ChangeDetectionStrategy, trigger, state, style, transition, animate,
  keyframes, HostListener, ChangeDetectorRef, ElementRef, Input
} from '@angular/core';
import {WindowRefService} from "../../services/window-ref.service";

@Component({
  selector: 'i24-pop-out',
  templateUrl: './pop-out.component.html',
  styleUrls: ['./pop-out.component.scss'],
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
export class PopOutComponent implements OnInit {

  @Input() animateDelay: number;

  state: string;
  isVisible: boolean;

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private elementRef: ElementRef,
              private windowRef: WindowRefService) {
    this.isVisible = false;
  }

  ngOnInit() {
    this.setVisible();
  }

  @HostListener("window:scroll", ["$event"])
  onScroll(event) {
    this.setVisible();
  }

  private setVisible(): void {
    if (this.animateDelay == null) {
      this.animateDelay = 100;
    }

    if (this.isElementInViewport(this.elementRef.nativeElement, this.windowRef.nativeWindow)) {
      setTimeout(() => {
        this.isVisible = true;
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
      (window.pageYOffset <= top + height && top <= window.pageYOffset + window.innerHeight)
    );
  }

}
