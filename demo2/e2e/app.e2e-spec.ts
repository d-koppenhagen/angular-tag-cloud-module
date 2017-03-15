import { TagCloudDemoPage } from './app.po';

describe('tag-cloud-demo App', () => {
  let page: TagCloudDemoPage;

  beforeEach(() => {
    page = new TagCloudDemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
