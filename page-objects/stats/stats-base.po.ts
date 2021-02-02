import { clickOnElement, isDisplayed } from '@e2e/helpers/common-helper';

export abstract class StatsBasePage {
  private readonly statsContainer: string = 'div#stats-container';

  constructor(readonly container: string, readonly page: string) {
    this.container = container;
    this.page = page;
  }

  isDisplayed(): boolean {
    return isDisplayed($(this.container));
  }

  navigate(): void {
    clickOnElement($('#menu').$('[href$="/stats"]'));
    browser.waitUntil(() => isDisplayed($(this.statsContainer), true));

    clickOnElement($(this.page));
    browser.waitUntil(() => this.isDisplayed());
  }
}
