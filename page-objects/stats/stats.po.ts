import { clickOnElement, getText, isDisplayed } from '@e2e/helpers/common-helper';
import { randomText } from '@e2e/helpers/random-helper';

import { en } from '@e2e/i18n/en';

import { TimePreset } from '@e2e/models/time-preset-model';

import { RemovePeriodDialog } from '../time/remove-period-dialog.po';
import { AddPeriodSidenavStatsPage } from './add-period-sidenav-stats-page.po';

import { StatsBasePage } from './stats-base.po';

export class StatsPage extends StatsBasePage {
  private readonly addPeriodButton: string = '.add-time-button';
  private readonly datePickerFrom: string  = '#date-from';
  private readonly datePickerTo: string  = '#date-to';
  private readonly datePickers: string  = 'div.datepickers';
  private readonly searchButton: string  = `button=${en.search}`;
  private readonly statsForm: string = 'form#stats-form';

  constructor() {
    super('div#stats-container', '[href$="/stats"]')
  }

  addPeriod(timePreset: TimePreset): string[] {
    const addPeriodSidenavStatsPage = new AddPeriodSidenavStatsPage();
    const periodsCount = this.getPeriodsCount();
    const totalDuration = this.getTotalDuration();

    this.clickOnAddPeriodButton();
    browser.waitUntil(() => addPeriodSidenavStatsPage.isDisplayed());
    browser.waitUntil(() => addPeriodSidenavStatsPage.isDatePickerDisplayed());

    addPeriodSidenavStatsPage.setTodayDate();
    browser.waitUntil(() => addPeriodSidenavStatsPage.isTodayDaySelected());

    addPeriodSidenavStatsPage.setTimePreset(timePreset);

    const duration = addPeriodSidenavStatsPage.getTimePickerValue();
    const project = addPeriodSidenavStatsPage.setTasks();
    const description = addPeriodSidenavStatsPage.setDescription();

    addPeriodSidenavStatsPage.clickOnAddPeriodButton();
    browser.waitUntil(() => addPeriodSidenavStatsPage.isDisplayed() === false);
    browser.waitUntil(() => this.getPeriodsCount() > periodsCount);
    browser.waitUntil(() => this.getTotalDuration() !== totalDuration);

    return [description, duration, project];
  }

  clickOnAddPeriodButton(): void {
    clickOnElement($(this.container).$(this.addPeriodButton));
  }

  clickOnDatePickerFrom(): void {
    clickOnElement($(this.statsForm).$(this.datePickerFrom));
  }

  clickOnDatePickerTo(): void {
    clickOnElement($(this.statsForm).$(this.datePickerTo));
  }

  clickOnEditPeriodButton(period: WebdriverIO.Element): void {
    period.scrollIntoView();
    period.moveTo();

    clickOnElement(period.$('.actions .edit'));
  }

  clickOnSearchButton(): void {
    clickOnElement($(this.statsForm).$(this.searchButton));
  }

  getDailyDuration(): string {
    const $duration = $(this.container).$('td.total');

    browser.waitUntil(() => $duration.isClickable());

    return getText($duration);
  }

  getDailyPeriodsHash(): string  {
    const hash = this.getPeriods().map($period => {
      const projectName = getText($period.$('td.tasks')).split(' : ')[0];
      const duration = getText($period.$('td.description'));
      const description = $period.$('td.duration input').getAttribute('value');

      return `${projectName}~${duration}~${description}`;
    })

    return hash.join('~');
  }

  getDatePickerFromDate(): string  {
    return $(this.datePickers).$('input#date-from').getAttribute('value').replace(',', '').split(' ')[1];
  }

  getDatePickerToDate(): string  {
    return $(this.datePickers).$('input#date-to').getAttribute('value').replace(',', '').split(' ')[1];
  }

  getDatePickerId(index: number): string  {
    const $datePickers = $(this.datePickers).$$('div.datepicker-modal');

    return $datePickers[index].getAttribute('id');
  }

  getPeriodDescription(period: WebdriverIO.Element): string {
    return period.$('.description textarea').getAttribute('value');
  }

  getPeriodDuration(period: WebdriverIO.Element): string {
    return period.$('.duration input').getAttribute('value');
  }

  getPeriods(): WebdriverIO.ElementArray {
    return $$('tr.inline-form-row');
  }

  getPeriodsCount(): number {
    return this.getPeriods().length;
  }

  getTotalDuration(): string  {
    const totalDuration = getText($(this.container).$('span.sum'));
    const splittedText = totalDuration.split(' ');
    let hours = '0';
    let minutes = '00';

    if (totalDuration.includes('hour')) {
      hours = splittedText[0];

      if (totalDuration.includes('minutes')) {
        minutes = splittedText[2];
      }
    } else {
      minutes = splittedText[0];
    }

    return minutes.length <= 1 ? `${hours}:0${minutes}` : `${hours}:${minutes}`;
  }

  isAddPeriodButtonDisplayed(): boolean {
    return isDisplayed($(this.container).$(this.addPeriodButton));
  }

  isDatePickerFromFieldDisplayed(): boolean {
    return isDisplayed($(this.statsForm).$(this.datePickerFrom));
  }

  isDatePickerToFieldDisplayed(): boolean {
    return isDisplayed($(this.statsForm).$(this.datePickerTo));
  }

  isSearchButtonDisplayed(): boolean {
    return isDisplayed($(this.statsForm).$(this.searchButton));
  }

  isSearchButtonEnabled(): boolean {
    return $(this.statsForm).$(this.searchButton).isEnabled();
  }

  removePeriod(period: WebdriverIO.Element): void {
    const periodsCount = this.getPeriodsCount();
    const removePeriodDialog = new RemovePeriodDialog();

    period.scrollIntoView();
    period.moveTo();

    clickOnElement(period.$('.actions .delete'));
    browser.waitUntil(() => removePeriodDialog.isDisplayed());

    removePeriodDialog.clickOnSubmitButton();
    browser.waitUntil(() => removePeriodDialog.isDisplayed() === false);
    browser.waitUntil(() => this.getPeriodsCount() !== periodsCount);
  }

  setPeriodDescription(period: WebdriverIO.Element): string {
    const $desriptionField = period.$('.description textarea');
    const text = randomText(10, 20);

    $desriptionField.clearValue();
    $desriptionField.setValue(text);

    return text;
  }

  setPeriodDuration(period: WebdriverIO.Element, duration: string): string {
    const $durationField = period.$('.duration input');

    $durationField.clearValue();
    $durationField.setValue(duration);

    return duration;
  }
}
