import { clickOnElement, getText, isDisplayed } from '@e2e/helpers/common-helper';
import { randomNumber } from '@e2e/helpers/random-helper';

import { LeavesAndAbsencesPage } from './leaves-and-absences.po';

export class RequestVacationPage extends LeavesAndAbsencesPage {
  private readonly availableDays: string = '#vac_days';
  private readonly currentDate: string = 'td.today';
  private readonly datePickerContainer: string = 'div.datepicker';
  private readonly pendingDays: string = 'td.pendingDays-highlight';
  private readonly submitButton: string = '[value="Submit"]';

  constructor() {
    super('div.reportVacations', '[href$="/report-vacations"]');
  }

  clickOnNextMonth(): void {
    clickOnElement($(this.datePickerContainer).$('th.next'));
  }

  clickOnSubmitButton(): void {
    clickOnElement($(this.container).$(this.submitButton));
  }

  clickOnTodayButton(): void {
    clickOnElement($(this.datePickerContainer).$('th.today'));
  }

  getAvailableDays(): number {
    return Number($(this.container).$(this.availableDays).getAttribute('value'));
  }

  getPendingVacationDaysCount(): number {
    return $(this.datePickerContainer).$$(this.pendingDays).length;
  }

  getPendingVacationDaysHash(): string {
    return $(this.datePickerContainer).$$(this.pendingDays).map($pendingDay => getText($pendingDay)).join('~');
  }

  private getPossibleDays(): WebdriverIO.ElementArray {
    return $(this.datePickerContainer).$$(
      'td[class*="day"]:not([class~="disabled"]):not([class~="old"]):not([class~="new"]):not([class~="pendingDays-highlight"])'
    );
  }

  isCurrentDateDisplayed(): boolean {
    return isDisplayed($(this.datePickerContainer).$(this.currentDate));
  }

  isDatePickerDisplayed(): boolean {
    return isDisplayed($(this.container).$(this.datePickerContainer));
  }

  isSubmitButtonDisplayed(): boolean {
    return isDisplayed($(this.container).$(this.submitButton));
  }

  removePendingVacationDays(): void {
    const $pendingDays = $(this.datePickerContainer).$$(this.pendingDays);

    for (const $pendingDay of $pendingDays) {
      $pendingDay.waitForExist();
      $pendingDay.waitForClickable();

      clickOnElement($pendingDay);
    }
  }

  setVacationDays(): string {
    const $possibleDays = this.getPossibleDays();
    const vacationDaysCount = randomNumber(1, this.getAvailableDays() ? this.getAvailableDays() : 3);
    const offset = randomNumber(0, $possibleDays.length - vacationDaysCount - 1);
    let vacationDays = [];

    for (let i = 0; i < vacationDaysCount; i++) {
      const $day = $possibleDays[i + offset];

      $day.waitForExist();
      $day.waitForClickable();
      vacationDays.push(getText($day));
      clickOnElement($day);
    }

    return vacationDays.join('~');
  }
}
