export class FiveADayFeedbackRow {
  ifLessThan: number;
  feedback: string;
}

export class FiveADayFeedback {

  readonly rows: FiveADayFeedbackRow[];

  constructor(rows: FiveADayFeedbackRow[]) {
    this.rows = rows;
  }

  get(portions: number): FiveADayFeedbackRow {
    return this.rows.find(function (r) {
      return portions < r.ifLessThan;
    });
  }

  static fromJson(json: any): FiveADayFeedback {

    let result = new Array<FiveADayFeedbackRow>();

    for (let i = 0; i < json.length; i++) {
      result.push({
        ifLessThan: json[i].ifLessThan,
        feedback: json[i].feedback
      });
    }

    return new FiveADayFeedback(result);
  }
}
