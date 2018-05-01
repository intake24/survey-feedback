import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {AppAuthHttp} from "./app-http.service";
import {ApiEndpoints} from "../api-endpoints";
import {map} from "rxjs/internal/operators";

@Injectable()
export class WeightTargetsService {

  constructor(private httpService: AppAuthHttp) { }

  list(): Observable<WeightTarget[]> {
    return this.httpService.get(ApiEndpoints.weightTargets()).pipe(
      map(res => res.json().map(this.jsonToWeightTarget))
    );
  }

  private jsonToWeightTarget(json: any): WeightTarget {
    return new WeightTarget(json.id, json.description, json.coefficient);
  }

}

export class WeightTarget {

  readonly id: string;
  readonly description: string;
  readonly coefficient: number;

  constructor(id: string, description: string, coefficient: number) {
    this.id = id;
    this.description = description;
    this.coefficient = coefficient;
  }

}
