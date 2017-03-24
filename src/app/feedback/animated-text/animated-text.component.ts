import {
  Component, OnInit, ChangeDetectionStrategy, trigger, state, style, transition, animate,
  keyframes, Input, ChangeDetectorRef, ElementRef, HostListener
} from '@angular/core';
import {WindowRefService} from "../../services/window-ref.service";

@Component({
  selector: 'i24-animated-text',
  templateUrl: './animated-text.component.html',
  styleUrls: ['./animated-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger("popIn", [
      state("in", style({transform: "translateY(0)", opacity: 1})),
      state("out", style({transform: "translateY(-50px)", opacity: 0})),
      transition("out => in", [
        animate(300, keyframes([
          style({opacity: 0, transform: 'translateY(-50px)', offset: 0}),
          style({opacity: 1, transform: 'translateY(15px)', offset: 0.3}),
          style({opacity: 1, transform: 'translateY(0)', offset: 1.0})
        ]))
      ])
    ])
  ]
})
export class AnimatedTextComponent implements OnInit {

  @Input() animateDelay: number;

  isVisible: boolean;

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private elementRef: ElementRef,
              private windowRef: WindowRefService) {
    this.isVisible = false;
  }

  ngOnInit() {
    setTimeout(() => this.setVisible(), 200);
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
      (window.pageYOffset <= top + height && top <= window.pageYOffset + window.innerHeight - 250)
    );
  }

}
