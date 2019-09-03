import {
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {FeedbackCardParameters} from '../playing-cards/playing-cards.component';
import {CharacterCardComponent, PlayingCardDetails} from '../character-card/character-card.component';
import {FiveADayCardComponent} from '../five-a-day-card/five-a-day.component';
import {SurveyFeedbackStyleEnum} from '../../classes/survey-feedback-style.enum';
import {FeedbackCardComponent} from './feedback-card';
import {FoodGroupCardComponent} from '../food-group-card/food-group-card.component';


@Component({
  selector: 'feedback-card',
  templateUrl: './feedback-card.component.html'
})
export class FeedbackCardDynamicComponent implements OnInit {

  @Input() parameters: FeedbackCardParameters;
  @Input() feedbackStyle: SurveyFeedbackStyleEnum;
  @Input() enteredViewport: EventEmitter<any>;
  @Input() leftViewport: EventEmitter<any>;
  @Input() test: string;

  @Output() onTellMeMore: EventEmitter<PlayingCardDetails[]>;

  @ViewChild('container', {read: ViewContainerRef}) private container: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    this.onTellMeMore = new EventEmitter();
  }

  private getCardComponentType(): Type<FeedbackCardComponent> {
    switch (this.parameters.cardType) {
      case 'character':
        return CharacterCardComponent;
      case 'five-a-day':
        return FiveADayCardComponent;
      case 'food-group':
        return FoodGroupCardComponent;
    }
  }

  ngOnInit() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.getCardComponentType());
    const viewContainerRef = this.container;
    const componentRef = viewContainerRef.createComponent(componentFactory);
    componentRef.instance.parameters = this.parameters;
    componentRef.instance.feedbackStyle = this.feedbackStyle;
    componentRef.instance.onTellMeMore.subscribe(e => this.onTellMeMore.emit(e));
    this.enteredViewport.subscribe(_ => componentRef.instance.onEnteredViewport());
    this.leftViewport.subscribe(_ => componentRef.instance.onLeftViewport());
  }
}
