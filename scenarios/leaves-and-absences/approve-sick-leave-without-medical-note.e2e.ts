import { logInAsUser } from '@e2e/helpers/authorization-helper';
import { isSuccessToastDisplayed } from '@e2e/helpers/common-helper';
import { Admin, User } from '@e2e/helpers/users-helper';

import { ReportSickLeavePage, ReportsSickLeavesPage, StatsDatePicker, StatsPage } from '@e2e/page-objects';

describe('Approve sick leave without medical note', () => {
  const reportSickLeave = new ReportSickLeavePage();
  const reportsSickLeavesPage = new ReportsSickLeavesPage();
  const statsPage = new StatsPage();

  beforeAll(() => {
    reportSickLeave.navigate();
  });

  it('available sick leave days without medical note should be more than zero', () => {
    expect(reportSickLeave.getAvailableDaysWithoutNote()).toBeGreaterThan(0);
  });

  it('should report sick leave', () => {
    reportSickLeave.setStartDate();
    reportSickLeave.setEndDate();

    reportSickLeave.clickOnReportButton();
    browser.waitUntil(() => reportSickLeave.isReportButtonEnabled());

    expect(reportSickLeave.isErrorMessageDisplayed()).toBe(false, 'Error message is displayed');
    expect(reportSickLeave.isSuccessMessageDisplayed()).toBe(true, 'Success message is not displayed');
  });

  it('employee`s request should be displayed', () => {
    logInAsUser(Admin.id);

    reportsSickLeavesPage.navigate();

    browser.waitUntil(() => reportsSickLeavesPage.isRequestsTableDisplayed());

    expect(reportsSickLeavesPage.isEmployeeDisplayed(User.fullName)).toBe(true);
  });

  it('approve sick leave button on requests page should be displayed', () => {
    expect(reportsSickLeavesPage.isApproveButtonDisplayed()).toBe(true);
  });

  it('approve sick leave button on requests page should be disabled', () => {
    expect(reportsSickLeavesPage.isApproveButtonEnabled()).toBe(false);
  });

  it('should approve reported sick leave', () => {
    reportsSickLeavesPage.approveSickLeave(User.fullName);

    expect(isSuccessToastDisplayed()).toBe(true);
  });

  it('should check that sick leave is created in stats page', () => {
    logInAsUser(User.id);

    statsPage.navigate();

    const datePickerFrom = new StatsDatePicker(statsPage.getDatePickerId(0));

    statsPage.clickOnDatePickerFrom();
    browser.waitUntil(() => datePickerFrom.isDisplayed());
    browser.waitUntil(() => datePickerFrom.isTodayDisplayed());

    datePickerFrom.setDay(new Date().getDate());

    datePickerFrom.clickOnSubmitButton();
    browser.waitUntil(() => datePickerFrom.isDisplayed() === false);

    statsPage.clickOnSearchButton();
    browser.waitUntil(() => statsPage.isSearchButtonEnabled() === false);
    browser.waitUntil(() => statsPage.isSearchButtonEnabled());

    expect(statsPage.getDailyDuration()).toBe('8:00');
    expect(statsPage.getPeriodsCount()).toBeGreaterThanOrEqual(1);
  });

  afterAll(() => {
    const $periods = statsPage.getPeriods();

    for (const $period of $periods) {
      statsPage.removePeriod($period);
    }
  });
});
