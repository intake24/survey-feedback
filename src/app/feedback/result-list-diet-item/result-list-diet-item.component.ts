import {Component, Input, ElementRef, HostListener} from "@angular/core";
import {SELECTOR_PREFIX} from "../feedback.const";
import {window} from "@angular/platform-browser/src/facade/browser"

@Component({
    selector: SELECTOR_PREFIX + "result-list-diet-item",
    templateUrl: "./result-list-diet-item.component.html",
    styleUrls: ["./result-list-diet-item.component.scss"]
})

export class ResultListDietItemComponent {

    private ELEMENTS_IN_COL: number = 3;
    private ASPECT_RATIO: number = 16/9;

    height: number;

    @Input() imgSrc: string;
    @Input() title: string;
    @Input() sourceOf: string[];
    @Input() howMany: string;

    constructor(private elementRef: ElementRef) {

    }

    @HostListener("window:resize", ["$event"])
    onResize(event) {
        this.setSize();
    }

    ngOnInit(): void {
        this.setSize();
    }

    private setSize(): void {
        this.height = this.elementRef.nativeElement.offsetWidth / this.ASPECT_RATIO;
    }

}
