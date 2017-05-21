import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

@Injectable()
export class WeightTargetsService {

  constructor() { }

  list(): Observable<WeightTarget[]> {
    return Observable.of([
      new WeightTarget('keep_weight', 'Keep weight'),
      new WeightTarget('loose_weight', 'Loose weight'),
      new WeightTarget('gain_weight', 'Gain weight')
    ]);
  }

}

export class WeightTarget {

  readonly id: string;
  readonly description: string;

  constructor(id: string, description: string) {
    this.id = id;
    this.description = description;
  }

}
