import {
  Component, OnInit, Input, ChangeDetectionStrategy
} from '@angular/core';
import {Food} from "../../classes/survey-result.class";
import {AnimateActionEnum} from "../../../animations/animate-action.enum";
import {NutrientTypesService} from "../../services/nutrient-types.service";

@Component({
  selector: 'i24-animated-list',
  templateUrl: 'animated-list.component.html',
  styleUrls: ['animated-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AnimatedListComponent implements OnInit {

  readonly animation: AnimateActionEnum = AnimateActionEnum.BounceInLeft;

  @Input() items: Food[];
  @Input() total: number;
  @Input() classList: string[];
  @Input() nutrientTypeId: number;
  @Input() animationDelay: number;
  @Input() showPerDay: boolean;

  constructor(private nutrientService: NutrientTypesService) {
  }

  ngOnInit() {

  }


}
