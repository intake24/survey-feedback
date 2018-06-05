import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {AggregateFoodStats, Food} from "../../classes/survey-result.class";
import {NutrientTypesService} from "../../services/nutrient-types.service";
import {AnimateActionEnum} from "../../../animate-ts/animate-action.enum";

@Component({
  selector: 'i24-animated-list',
  templateUrl: 'animated-list.component.html',
  styleUrls: ['animated-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AnimatedListComponent implements OnInit {

  readonly animation = AnimateActionEnum.BounceInLeft;

  @Input() items: AggregateFoodStats[];
  @Input() total: number;
  @Input() classList: string[];
  @Input() nutrientTypeId: number;
  @Input() animationDelay: number;
  @Input() showPerDay: boolean;

  constructor(public nutrientService: NutrientTypesService) {
  }

  ngOnInit() {

  }


}
