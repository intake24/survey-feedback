export enum AnimateActionEnum {
  Hidden = <any>"Hidden",
  Visible = <any>"Visible",
  FadeIn = <any>"FadeIn",
  BounceInUp = <any>"BounceInUp",
  BounceInUpBig = <any>"BounceInUpBig",
  BounceInDown = <any>"BounceInDown",
  BounceInDownBig = <any>"BounceInDownBig",
  BounceInLeft = <any>"BounceInLeft",
  BounceInLeftBig = <any>"BounceInLeftBig",
  BounceInRight = <any>"BounceInRight",
  BounceInRightBig = <any>"BounceInRightBig",
  BounceOut = <any>"BounceOut",
  BounceOutUp = <any>"BounceOutUp",
  BounceOutDown = <any>"BounceOutDown",
  BounceOutDownBig = <any>"BounceOutDownBig",
  BounceOutLeft = <any>"BounceOutLeft",
  BounceOutLeftBig = <any>"BounceOutLeftBig",
  BounceOutRight = <any>"BounceOutRight",
  BounceOutRightBig = <any>"BounceOutRightBig",
  ZoomIn = <any>"ZoomIn"
}

export class AnimateActionAlias {
  private static readonly aliasMap: Map<AnimateActionEnum, AnimateActionEnum> = new Map([
    [AnimateActionEnum.Visible, AnimateActionEnum.Visible],
    [AnimateActionEnum.FadeIn, AnimateActionEnum.Visible],
    [AnimateActionEnum.BounceInUp, AnimateActionEnum.Visible],
    [AnimateActionEnum.BounceInUpBig, AnimateActionEnum.Visible],
    [AnimateActionEnum.BounceInDown, AnimateActionEnum.Visible],
    [AnimateActionEnum.BounceInDownBig, AnimateActionEnum.Visible],
    [AnimateActionEnum.BounceInLeft, AnimateActionEnum.Visible],
    [AnimateActionEnum.BounceInLeftBig, AnimateActionEnum.Visible],
    [AnimateActionEnum.BounceInRight, AnimateActionEnum.Visible],
    [AnimateActionEnum.BounceInRightBig, AnimateActionEnum.Visible],
    [AnimateActionEnum.ZoomIn, AnimateActionEnum.Visible],

    [AnimateActionEnum.Hidden, AnimateActionEnum.Hidden],
    [AnimateActionEnum.BounceOut, AnimateActionEnum.Hidden],
    [AnimateActionEnum.BounceOutUp, AnimateActionEnum.Hidden],
    [AnimateActionEnum.BounceOutDown, AnimateActionEnum.Hidden],
    [AnimateActionEnum.BounceOutDownBig, AnimateActionEnum.Hidden],
    [AnimateActionEnum.BounceOutLeft, AnimateActionEnum.Hidden],
    [AnimateActionEnum.BounceOutLeftBig, AnimateActionEnum.Hidden],
    [AnimateActionEnum.BounceOutRight, AnimateActionEnum.Hidden],
    [AnimateActionEnum.BounceOutRightBig, AnimateActionEnum.Hidden],
  ]);

  static getItem(animateActionEnum: AnimateActionEnum): AnimateActionEnum {
    return AnimateActionAlias.aliasMap.get(animateActionEnum);
  }

}
