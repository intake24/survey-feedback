import {
  AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output,
  ViewChild
} from "@angular/core";
import {SELECTOR_PREFIX} from "../feedback.const";
import {FeedbackCardComponent} from "../feedback-card/feedback-card";
import {CharacterCardParameters} from "../../classes/character.class";
import * as Gauge from "svg-gauge";
import {FiveADayFeedbackRow} from "../../classes/five-a-day-feedback";


export class FiveADayCardParameters {
  readonly cardType = "five-a-day";
  readonly portions: number;
  readonly feedback: FiveADayFeedbackRow;

  constructor(portions: number, feedback: FiveADayFeedbackRow) {
    this.feedback = feedback;
    this.portions = portions;
  }
}

@Component({
  selector: SELECTOR_PREFIX + "five-a-day-card",
  templateUrl: "./five-a-day.component.html",
  styleUrls: ["./five-a-day.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiveADayCardComponent extends FeedbackCardComponent implements AfterViewInit {

  @ViewChild('gauge') gaugeElem: ElementRef;
  gauge: any;

  @Input() parameters: FiveADayCardParameters;

  getEncapsulationId(): string {
    let attrs = this.gaugeElem.nativeElement.attributes;

    for (let i = 0; i < attrs.length; i++)
      if (attrs[i].name.startsWith("_ngcontent"))
        return attrs[i].name;

    return null;
  }

  markChildrenWithAttribute(element: any, attrName: string): void {
    for (let i=0; i<element.children.length; i++) {
      let child = element.children[i];
      child.setAttribute(attrName, "");
      this.markChildrenWithAttribute(child, attrName);
    }
  }

  ngAfterViewInit(): void {

    this.gauge = Gauge(this.gaugeElem.nativeElement, {
      max: 5,
      // custom label renderer
      label: function (value) {
        return Math.round(value) + "/" + this.max;
      },
      value: 0,
      dialRadius: 40,
      dialStartAngle: 180,
      dialEndAngle: 0,
      showValue: false,
      // Custom dial colors (Optional)
      color: function (value) {
        if (value < 2) {
          return "#e16534";
        } else if (value < 3) {
          return "#efec61";
        } else if (value < 4) {
          return "#f7aa38";
        } else {
          return "#afe161";
        }
      }
    });


    this.markChildrenWithAttribute(this.gaugeElem.nativeElement, this.getEncapsulationId());


// Set gauge value
    //  gauge.setValue(75);

// Set value and animate (value, animation duration in seconds)
    //gauge.setValueAnimated(90, 1);

  }

  tellMeMore(): void {
    this.onTellMeMore.emit(null);
  }

  onEnteredViewport() {
    if (this.gauge) {
      this.gauge.setValueAnimated(this.parameters.portions, 1);
    }
  }

  onLeftViewport() {

  }

}
