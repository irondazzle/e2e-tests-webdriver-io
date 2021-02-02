import { clickOnElement, isDisplayed } from '@e2e/helpers/common-helper';

export abstract class ProjectsPage {
  private readonly projectsContainer: string = 'div.content';

  constructor(readonly container: string, readonly page: string) {
    this.container = container;
    this.page = page;
  }

  isDisplayed(): boolean {
    return isDisplayed($(this.container));
  }

  navigate(): void {
    clickOnElement($('#menu').$('[href$="/projects"]'));
    browser.waitUntil(() => isDisplayed($(this.projectsContainer), true));

    clickOnElement($('.subMenu').$(this.page));
    browser.waitUntil(() => this.isDisplayed());
  }
}
