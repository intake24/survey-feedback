import {Component, Input} from "@angular/core";
import {MeterBarError} from "./meter-bar-errors";

@Component({
    selector: "meter-bar",
    templateUrl: "./meter-bar.component.html",
    styleUrls: ["./meter-bar.component.scss"]
})

export class MeterBarComponent {

    private rangeWidth: number;

    sortedRanges: MeterBarSectionInternal[];
    levelProportion: number;

    @Input() level: number;
    @Input() ranges: MeterBarSection[];

    constructor() {
        this.setRangeWidth();
        this.createInternalRanges();
    }

    private setRangeWidth(): void {
        let min = null;
        let max = null;

        this.ranges.forEach((range: MeterBarSection) => {
            this.ranges.forEach((compRange: MeterBarSection) => {
                if (range.start <= compRange.end && compRange.start <= range.end) {
                    throw new MeterBarError(MeterBarError.RANGES_OVERLAP);
                }
            });

            if (min == null || range.start < min) {
                min = range[0];
            }
            if (max == null || max < range.end) {
                max = range.end
            }
        });

        if (this.level < min || this.level > max) {
            throw new MeterBarError(MeterBarError.BAD_LEVEL);
        }

        this.rangeWidth = max - min;
    }

    private setLevelProportion(): void {

    }

    private createInternalRanges(): void {
        this.ranges.forEach(range => {
            this.sortedRanges.push(new MeterBarSectionInternal(range.start,
                range.end,
                range.type,
                this.rangeWidth,
                range.startCaption,
                range.endCaption));
        });
        this.sortedRanges.sort((r1, r2) => r1.start - r2.start);
    }

}

export class MeterBarSection {

    public static SECTION_TYPES: string[] = ["danger", "warning", "success"];

    readonly start: number;
    readonly startCaption: string;
    readonly end: number;
    readonly endCaption: string;
    readonly type: string;

    constructor(start: number, end: number, type: string, startCaption?: string, endCaption?: string) {

        if (start > end) {
            throw new MeterBarError(MeterBarError.BAD_RANGE);
        }
        if (MeterBarSection.SECTION_TYPES.indexOf(type) < 0) {
            throw new MeterBarError(MeterBarError.BAD_TYPE);
        }

        this.start = start;
        this.end = end;
        this.startCaption = startCaption;
        this.endCaption = endCaption;
        this.type = type;
    }

}

class MeterBarSectionInternal extends MeterBarSection {

    readonly proportion: number;

    constructor(start: number, end: number, type: string, width: number, startCaption?: string, endCaption?: string) {
        super(start, end, type, startCaption, endCaption);
        this.proportion = (this.end - this.start) / width;
    }

}
