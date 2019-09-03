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

export const WelcomeFormMessages = {
  default: new MessageSet('About you', 'We only need a few details', 'Submit'),
  playful: new MessageSet('Great!', 'I only need to ask a few things about you', 'Yep, that\'s me')
};
