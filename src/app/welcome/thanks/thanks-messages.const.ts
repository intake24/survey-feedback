class MessageSet {
  readonly title: string;
  readonly subTitle: string;
  readonly buttonText: string;
  constructor(title: string, subTitle: string, buttonText: string) {
    this.title = title;
    this.subTitle = subTitle;
    this.buttonText = buttonText;
  }
}

export const ThankYouMessages = {
  default: new MessageSet('Thank you!', 'Would you like to get some feedback about your diet?', 'Yes'),
  playful: new MessageSet('Many thanks!', 'Such a tasty diet you have! Would you like to learn more about it?', 'Yes, of course!')
};
