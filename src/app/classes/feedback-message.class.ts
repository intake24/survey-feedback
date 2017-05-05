export class FeedbackMessage {

  like: boolean;
  pageUrl: string;
  body: string;

  constructor(like: boolean, pageUrl: string, body: string) {
    this.like = like;
    this.pageUrl = pageUrl;
    this.body = body;
  }

}
