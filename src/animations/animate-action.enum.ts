export enum AnimateActionEnum {
  Hidden = <any>"Hidden",
  Visible = <any>"Visible",

  FadeIn = <any>"FadeIn",
  FadeInUp = <any>"FadeInUp",
  FadeInUpBig = <any>"FadeInUpBig",
  FadeInDown = <any>"FadeInDown",
  FadeInDownBig = <any>"FadeInDownBig",
  FadeInLeft = <any>"FadeInLeft",
  FadeInLeftBig = <any>"FadeInLeftBig",
  FadeInRight = <any>"FadeInRight",
  FadeInRightBig = <any>"FadeInRightBig",

  FadeOut = <any>"FadeOut",
  FadeOutUp = <any>"FadeOutUp",
  FadeOutDown = <any>"FadeOutDown",
  FadeOutDownBig = <any>"FadeOutDownBig",
  FadeOutLeft = <any>"FadeOutLeft",
  FadeOutLeftBig = <any>"FadeOutLeftBig",
  FadeOutRight = <any>"FadeOutRight",
  FadeOutRightBig = <any>"FadeOutRightBig",

  BounceInUp = <any>"BounceInUp",
  BounceInUpBig = <any>"BounceInUpBig",
  BounceInDown = <any>"BounceInDown",
  BounceInDownBig = <any>"BounceInDownBig",
  BounceInLeft = <any>"BounceInLeft",
  BounceInLeftBig = <any>"BounceInLeftBig",
  BounceInRight = <any>"BounceInRight",
  BounceInRightBig = <any>"BounceInRightBig",

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
    [AnimateActionEnum.FadeInUp, AnimateActionEnum.Visible],
    [AnimateActionEnum.FadeInUpBig, AnimateActionEnum.Visible],
    [AnimateActionEnum.FadeInDown, AnimateActionEnum.Visible],
    [AnimateActionEnum.FadeInDownBig, AnimateActionEnum.Visible],
    [AnimateActionEnum.FadeInLeft, AnimateActionEnum.Visible],
    [AnimateActionEnum.FadeInLeftBig, AnimateActionEnum.Visible],
    [AnimateActionEnum.FadeInRight, AnimateActionEnum.Visible],
    [AnimateActionEnum.FadeInRightBig, AnimateActionEnum.Visible],

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

    [AnimateActionEnum.FadeOut, AnimateActionEnum.Hidden],
    [AnimateActionEnum.FadeOutUp, AnimateActionEnum.Hidden],
    [AnimateActionEnum.FadeOutDown, AnimateActionEnum.Hidden],
    [AnimateActionEnum.FadeOutDownBig, AnimateActionEnum.Hidden],
    [AnimateActionEnum.FadeOutLeft, AnimateActionEnum.Hidden],
    [AnimateActionEnum.FadeOutLeftBig, AnimateActionEnum.Hidden],
    [AnimateActionEnum.FadeOutRight, AnimateActionEnum.Hidden],
    [AnimateActionEnum.FadeOutRightBig, AnimateActionEnum.Hidden],

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
