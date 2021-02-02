import { clickOnElement, isDisplayed } from '@e2e/helpers/common-helper';

export class NewDatePicker {
  private readonly monthSelector: string = 'div.select-month';
  private readonly submitButton: string = 'button.datepicker-done';
  private readonly today: string = 'td.is-today';
  private readonly yearSelector: string = 'div.select-year';

  constructor(readonly container: string) {
    this.container = `#${container}`;
  }

  clickOnSubmitButton(): void {
    clickOnElement($(this.container).$(this.submitButton));
  }

  getMonth(): string {
    return $(this.container).$(this.monthSelector).$('input').getValue();
  }

  getTodayData(): number {
    return Number($(this.container).$(this.today).getAttribute('data-day'));
  }

  getYear(): string {
    return $(this.container).$(this.yearSelector).$('input').getValue();
  }

  isDisplayed(): boolean {
    return isDisplayed($(this.container));
  }

  isSubmitButtonDisplayed(): boolean  {
    return isDisplayed($(this.container).$(this.submitButton));
  }

  isTodayDisplayed(): boolean  {
    return isDisplayed($(this.container).$(this.today));
  }

  setMonth(month: string): void {
    const oldMonth = this.getMonth();

    if (month !== oldMonth) {
      const $targetMonth = $(`span=${month}`);

      clickOnElement($(this.monthSelector));
      browser.waitUntil(() => isDisplayed($targetMonth));

      clickOnElement($targetMonth);
      browser.waitUntil(() => this.getMonth() !== oldMonth);
    }
  }

  setDay(day: number): void {
    const $day = $(this.container).$(`td[data-day="${day}"]`);

    clickOnElement($day);

    browser.waitUntil(() => $day.getAttribute('class').includes('is-selected'));
  }

  setYear(year: string): void {
    const oldYear = this.getYear();

    if (year !== oldYear) {
      const $targetYear = $(`span=${year}`);

      clickOnElement($(this.yearSelector));
      browser.waitUntil(() => isDisplayed($targetYear));

      clickOnElement($targetYear);
      browser.waitUntil(() => this.getYear() !== oldYear);
    }
  }
}
