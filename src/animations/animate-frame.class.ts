import {AnimateActionEnum} from "./animate-action.enum";

export class AnimateFrame {
  action: AnimateActionEnum;
  timeout: number;

  constructor(action: AnimateActionEnum, timeout?: number) {
    this.action = action;
    this.timeout = timeout;
  }

}
