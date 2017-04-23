import { NexmoSmsPage } from './app.po';

describe('nexmo-sms App', () => {
  let page: NexmoSmsPage;

  beforeEach(() => {
    page = new NexmoSmsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
