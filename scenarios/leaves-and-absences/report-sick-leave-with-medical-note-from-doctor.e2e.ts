import { isSuccessToastDisplayed } from '@e2e/helpers/common-helper';

import { ReportSickLeavePage, StatsDatePicker, StatsPage } from '@e2e/page-objects';

describe('Report sick leaves with medical note from corporate doctor', () => {
  const medicalNote = 'Note from the corporate doctor';
  const pathToNote = 'resources/file.jpg';
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

  it('should select medical note type', () => {
    reportSickLeave.setMedicalNoteType(medicalNote);

    expect(reportSickLeave.isFileUploaderDisplayed()).toBe(true);
  });

  it('available sick leave days with medical note should be more than zero', () => {
    expect(reportSickLeave.getAvailableDaysWithNote()).toBeGreaterThan(0);
  });

  it('available sick leave days without medical note should be more than zero', () => {
    expect(reportSickLeave.getAvailableDaysWithoutNote()).toBeGreaterThan(0);
  });

  it('should check that not possible to submit form without medical note', () => {
    reportSickLeave.setStartDate();
    reportSickLeave.setEndDate();

    reportSickLeave.clickOnReportButton();

    expect(reportSickLeave.isErrorMessageDisplayed()).toBe(true);
  });

  it('should report sick leave', () => {
    reportSickLeave.setStartDate();
    reportSickLeave.setEndDate();

    reportSickLeave.uploadNote(pathToNote);

    expect(reportSickLeave.isUploadedFileDisplayed()).toBe(true, 'Uplodaded file is not displayed');

    reportSickLeave.clickOnReportButton();
    browser.waitUntil(() => reportSickLeave.isReportButtonEnabled());

    expect(reportSickLeave.isErrorMessageDisplayed()).toBe(false, 'Error message is displayed');
    expect(reportSickLeave.isSuccessMessageDisplayed()).toBe(true, 'Success message is not displayed');
  });

  it('should remove reported sick leave', () => {
    const statsPage = new StatsPage();
    const today = new Date().getDate();

    statsPage.navigate();

    //NOTE: By default, the search button is enabled after navigation.
    //After that back-end request is sent and the button becomes disabled for request duration.
    browser.waitUntil(() => statsPage.isSearchButtonEnabled() === false);
    browser.waitUntil(() => statsPage.isSearchButtonEnabled());

    const datePickerFrom = new StatsDatePicker(statsPage.getDatePickerId(0));
    const datePickerTo = new StatsDatePicker(statsPage.getDatePickerId(1));

    statsPage.clickOnDatePickerTo();
    browser.waitUntil(() => datePickerTo.isDisplayed());
    browser.waitUntil(() => datePickerTo.isTodayDisplayed());

    datePickerTo.setDay(today);

    datePickerTo.clickOnSubmitButton();
    browser.waitUntil(() => datePickerTo.isDisplayed() === false);

    statsPage.clickOnDatePickerFrom();
    browser.waitUntil(() => datePickerFrom.isDisplayed());
    browser.waitUntil(() => datePickerFrom.isTodayDisplayed());

    datePickerFrom.setDay(today);

    datePickerFrom.clickOnSubmitButton();
    browser.waitUntil(() => datePickerFrom.isDisplayed() === false);

    statsPage.clickOnSearchButton();
    browser.waitUntil(() => statsPage.isSearchButtonEnabled() === false);
    browser.waitUntil(() => statsPage.isSearchButtonEnabled());

    const periodsCount = statsPage.getPeriodsCount();

    statsPage.removePeriod(statsPage.getPeriods()[periodsCount - 1]);
    browser.waitUntil(() => statsPage.getPeriodsCount() < periodsCount);

    expect(isSuccessToastDisplayed()).toBe(true, 'Success toast is not displayed');
  });
});
