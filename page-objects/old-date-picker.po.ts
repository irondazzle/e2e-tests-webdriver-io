import { isDisplayed, clickOnElement } from '@e2e/helpers/common-helper';

export class OldDatePicker {
  private readonly container: string = '.datepicker';
  private readonly currentDate: string = 'td.today';

  clickOnNextMonth(): void {
    clickOnElement($(this.container).$('th.next'));
  }

  clickOnTodayButton(): void {
    clickOnElement($(this.container).$('th.today'));
  }

  private getPossibleDays(): WebdriverIO.ElementArray {
    return $(this.container).$$(
      'td[class*="day"]:not([class~="disabled"]):not([class~="old"]):not([class~="new"]):not([class~="pendingDays-highlight"])'
    );
  }

  isCurrentDateDisplayed(): boolean {
    return isDisplayed($(this.container).$(this.currentDate));
  }

  isDisplayed(): boolean {
    return isDisplayed($(this.container));
  }

  setTodayDate(): void {
    const $possibleDays = this.getPossibleDays();

    return clickOnElement($possibleDays[$possibleDays.length - 1]);
  }
}
