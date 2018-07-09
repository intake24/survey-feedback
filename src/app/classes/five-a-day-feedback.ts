export class FiveADayFeedback {
  readonly tellMeMoreText: string;
  readonly tooLowMessage: string;

  static fromJson(json: any): FiveADayFeedback {
    return json;
  }
}
