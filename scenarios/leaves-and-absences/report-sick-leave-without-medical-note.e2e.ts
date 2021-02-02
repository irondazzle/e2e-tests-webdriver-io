import { isSuccessToastDisplayed } from '@e2e/helpers/common-helper';

import { ReportSickLeavePage, ReportsSickLeavesPage } from '@e2e/page-objects';

describe('Report sick leaves without medical note', () => {
  const reportSickLeave = new ReportSickLeavePage();

  beforeAll(() => {
    reportSickLeave.navigate();
  });

  it('request sick leave page should be displayed', () => {
    expect(reportSickLeave.isDisplayed()).toBe(true);
  });

  it('available sick leave days with medical note should be displayed', () => {
    expect(reportSickLeave.isAvailableDaysWithNoteDisplayed()).toBe(true);
  });

  it('available sick leave days without medical note should be displayed', () => {
    expect(reportSickLeave.isAvailableDaysWithoutNoteDisplayed()).toBe(true);
  });

  it('start date picker should be displayed', () => {
    expect(reportSickLeave.isStartDatePickerDisplayed()).toBe(true);
  });

  it('end date picker should be displayed', () => {
    expect(reportSickLeave.isEndDatePickerDisplayed()).toBe(true);
  });

  it('file uploader should not be displayed', () => {
    expect(reportSickLeave.isFileUploaderDisplayed()).toBe(false);
  });

  it('available sick leave days with medical note should be more than zero', () => {
    expect(reportSickLeave.getAvailableDaysWithNote()).toBeGreaterThan(0);
  });

  it('available sick leave days without medical note should be more than zero', () => {
    expect(reportSickLeave.getAvailableDaysWithoutNote()).toBeGreaterThan(0);
  });

  it('should check that not possible to submit form without start and end dates', () => {
    reportSickLeave.clickOnReportButton();

    expect(reportSickLeave.isErrorMessageDisplayed()).toBe(true);
  });

  it('should report sick leave', () => {
    reportSickLeave.setStartDate();
    reportSickLeave.setEndDate();

    reportSickLeave.clickOnReportButton();
    browser.waitUntil(() => reportSickLeave.isReportButtonEnabled());

    expect(reportSickLeave.isErrorMessageDisplayed()).toBe(false, 'Error message is displayed');
    expect(reportSickLeave.isSuccessMessageDisplayed()).toBe(true, 'Success message is not displayed');
  });

  it('should reject reported sick leave', () => {
    const employeeFullName = 'Pidhornyi Kostiantyn';
    const reportsSickLeavesPage = new ReportsSickLeavesPage();

    reportsSickLeavesPage.navigate();

    reportsSickLeavesPage.clickOnOtherRadioButton();
    browser.waitUntil(() => reportsSickLeavesPage.isRequestsTableDisplayed());

    reportsSickLeavesPage.rejectSickLeave(employeeFullName);
    expect(isSuccessToastDisplayed()).toBe(true, 'Success toast is not displayed');
  });
});
