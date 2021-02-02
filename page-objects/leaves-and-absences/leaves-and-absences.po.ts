import { clickOnElement, isDisplayed } from '@e2e/helpers/common-helper';

export abstract class LeavesAndAbsencesPage {
  private readonly requestVacationContainer: string = 'div.reportVacations';

  constructor(readonly container: string, readonly page: string) {
    this.container = container;
    this.page = page;
  }

  isDisplayed(): boolean {
    return isDisplayed($(this.container));
  }

  navigate(): void {
    clickOnElement($('#menu').$('[href$="/report-vacations"]'));
    browser.waitUntil(() => isDisplayed($(this.requestVacationContainer), true));

    clickOnElement($('#menu').$(this.page));
    browser.waitUntil(() => this.isDisplayed());
  }
}
