import {none, Option, some} from 'ts-option';

export class OptionToRequest {
  static toRequest<T>(val: Option<T>): T[] {
    return val.match({
      some: v => [v],
      none: () => []
    })
  }

  static fromJson<T>(val: T[]): Option<T> {
    return val.length ? some(val[0]) : none;
  }
}
