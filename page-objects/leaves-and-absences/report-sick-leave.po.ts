import { clickOnElement, isDisplayed } from '@e2e/helpers/common-helper';

import { OldDatePicker } from '../old-date-picker.po';

import { LeavesAndAbsencesPage } from './leaves-and-absences.po';

const path = require('path');

export class ReportSickLeavePage extends LeavesAndAbsencesPage {
  private readonly availableDaysWithNote: string = '[e2e-id="withMedicalNote"]';
  private readonly availableDaysWithoutNote: string  = '[e2e-id="withoutMedicalNote"]';
  private readonly datePicker: OldDatePicker = new OldDatePicker();
  private readonly endDatePicker: string  = '#datepick2';
  private readonly reportButton: string  = '#report';
  private readonly startDatePicker: string  = '#datepick1';

  constructor() {
    super('div.reportSickness', '[href$="/report_sickness.php"]');
  }

  private clickOnEndDatePicker(): void {
    clickOnElement($(this.endDatePicker));
  }

  clickOnReportButton(): void {
    clickOnElement($(this.reportButton));
  }

  private clickOnStartDatePicker(): void {
    clickOnElement($(this.startDatePicker));
  }

  getAvailableDaysWithNote(): number {
    return Number($(this.container).$(this.availableDaysWithNote).getAttribute('value'));
  }

  getAvailableDaysWithoutNote(): number {
    return Number($(this.container).$(this.availableDaysWithoutNote).getAttribute('value'));
  }

  isAvailableDaysWithNoteDisplayed(): boolean {
    return isDisplayed($(this.container).$(this.availableDaysWithNote));
  }

  isAvailableDaysWithoutNoteDisplayed(): boolean {
    return isDisplayed($(this.container).$(this.availableDaysWithoutNote));
  }

  isEndDatePickerDisplayed(): boolean {
    return isDisplayed($(this.container).$(this.endDatePicker));
  }

  isErrorMessageDisplayed(): boolean {
    return isDisplayed($('.errorcontainer'));
  }

  isFileUploaderDisplayed(): boolean {
    return isDisplayed($('.fileuploader-input'));
  }

  isIncorrectFileExtensionErrorDisplayed(): boolean {
    return isDisplayed($('#errors_upload'));
  }

  isReportButtonEnabled(): boolean {
    return $(this.container).$(this.reportButton).isEnabled();
  }

  isStartDatePickerDisplayed(): boolean {
    return isDisplayed($(this.container).$(this.startDatePicker));
  }

  isSuccessMessageDisplayed(): boolean {
    return isDisplayed($('.messagecontainer'));
  }

  isUploadedFileDisplayed(): boolean {
    return isDisplayed($('.fileuploader-items'));
  }

  setEndDate(): void {
    this.clickOnEndDatePicker();
    browser.waitUntil(() => this.datePicker.isDisplayed());

    this.datePicker.setTodayDate();
  }

  setMedicalNoteType(type: string): void {
    $('#report_sickness_type').selectByVisibleText(type);
  }

  setStartDate(): void {
    this.clickOnStartDatePicker();
    browser.waitUntil(() => this.datePicker.isDisplayed());

    this.datePicker.setTodayDate();
  }

  uploadNote(pathToNote: string): void {
    const $fileUploader = $('input[name="files"]');

    browser.execute((el: Element) => el.removeAttribute('style'), $fileUploader);

    $fileUploader.setValue(path.resolve(pathToNote));
  }
}
