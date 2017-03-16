import { Intake24feedbackPage } from './app.po';

describe('intake24feedback App', () => {
  let page: Intake24feedbackPage;

  beforeEach(() => {
    page = new Intake24feedbackPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
