import { TagCloudPage } from './app.po';

describe('tag-cloud App', function() {
  let page: TagCloudPage;

  beforeEach(() => {
    page = new TagCloudPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
