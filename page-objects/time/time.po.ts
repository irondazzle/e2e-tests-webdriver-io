import { clickOnElement, getText, isDisplayed } from '@e2e/helpers/common-helper';

import { en } from '@e2e/i18n/en';

import { TimePreset } from '@e2e/models/time-preset-model';

import { AddPeriodSidenavTimePage } from './add-period-sidenav-time-page.po';
import { RemovePeriodDialog } from './remove-period-dialog.po';

export class TimePage {
  private readonly activeDay: string = 'div.active';
  private readonly addPeriodButton: string = `button=${en.newPeriod}`;
  private readonly period: string = 'div.task';
  private readonly playPauseButtonContainer: string = 'a.play-pause';
  private readonly requestOvertimeButton: string = `a=${en.overtimeRequest}`;
  private readonly todayButton: string = `button=${en.today}`;
  private readonly weekViewer: string = '#week-viewer';
  private readonly widgetTitle: string = '.day-title';

  addPeriod(time: TimePreset | string, isFromDropDownTab: boolean = false): string[] {
    const addPeriodSidenavTimePage = new AddPeriodSidenavTimePage();
    const periodsCount = this.getPeriodsCount();
    const totalDuration = this.getTotalDuration();
    let project: string;

    this.clickOnAddPeriodButton();
    browser.waitUntil(() => addPeriodSidenavTimePage.isDisplayed());
    browser.waitUntil(() => addPeriodSidenavTimePage.isTimePickerDisplayed());

    if ((Object.values(TimePreset) as string[]).includes(time)) {
      addPeriodSidenavTimePage.setTimePreset(time as TimePreset);
    } else {
      addPeriodSidenavTimePage.setTime(time);
    }

    const duration = addPeriodSidenavTimePage.getTimePickerValue();

    if (isFromDropDownTab) {
      addPeriodSidenavTimePage.clickOnDropDownTab();
      project = addPeriodSidenavTimePage.setTasks();
    } else {
      addPeriodSidenavTimePage.clickOnLatestProjectsTab();
      project = addPeriodSidenavTimePage.setLatestProject();
    }

    const description = addPeriodSidenavTimePage.setDescription();

    addPeriodSidenavTimePage.clickOnAddPeriodButton();
    browser.waitUntil(() => this.getPeriodsCount() > periodsCount);

    addPeriodSidenavTimePage.clickOnCloseButton();
    browser.waitUntil(() => addPeriodSidenavTimePage.isDisplayed() === false);
    browser.waitUntil(() => this.getTotalDuration() !== totalDuration);

    return [description, duration, project];
  }

  clickOnAddPeriodButton(): void {
    clickOnElement($(this.addPeriodButton));
  }

  clickOnDeletePeriodButton(period: WebdriverIO.Element): void {
    clickOnElement(period.$('div.actions i'));
  }

  clickOnPauseButton(): void {
    clickOnElement($(this.playPauseButtonContainer).$('i.pause'));
  }

  clickOnPeriod(period: WebdriverIO.Element): void {
    clickOnElement(period);
  }

  clickOnPlayButton(): void {
    clickOnElement($(this.playPauseButtonContainer).$('i.play'));
  }

  clickOnRequestOvertimeButton(): void {
    clickOnElement($(this.requestOvertimeButton));
  }

  clickOnTodayButton(): void {
    clickOnElement($(this.todayButton));
  }

  clickOnYesterday(): void {
    clickOnElement(this.getYesterdaySelector());
  }

  getActiveDayDate(): string {
    return getText($(this.activeDay).$('.date'));
  }

  getActiveDayName(): string {
    return getText($(this.activeDay).$('.week-day'));
  }

  getActiveDayTotalDuration(): string {
    const $totalDuration = $(this.activeDay).$('.duration');

    browser.waitUntil(() => $totalDuration.isClickable());

    return getText($totalDuration);
  }

  getDailyPeriodsHash(): string {
    const hash = $$(this.period).map($period => {
      const periodDuration = this.getPeriodDuration($period);
      const periodDescription = this.getPeriodDescription($period);
      const periodProjectName = this.getPeriodProjectName($period);

      return `${periodProjectName}~${periodDescription}~${periodDuration}`;
    }).reverse();

    return hash.join('~');
  }

  getPeriodsCount(): number {
    return this.getPeriods().length;
  }

  getPeriod(index: number): WebdriverIO.Element {
    return $$(this.period)[index];
  }

  getPeriods(): WebdriverIO.ElementArray {
    return $$(this.period);
  }

  getPeriodDescription(period: WebdriverIO.Element): string {
    return getText(period.$('.description'));
  }

  getPeriodDuration(period: WebdriverIO.Element): string {
    return getText(period.$('.duration'));
  }

  getPeriodProjectName(period: WebdriverIO.Element): string {
    return getText(period.$('.path-node-project'));
  }

  getPeriodsTotalDuration(): string {
    const $periods = $$(this.period);
    let hours: string | number = 0;
    let minutes: string | number = 0;

    for (const $period of $periods) {
      const periodDuration = this.getPeriodDuration($period);
      const splittedPeriod = periodDuration.split(':');

      hours += Number(splittedPeriod[0]);
      minutes += Number(splittedPeriod[1]);

      if (Math.floor(minutes / 60) > 0) {
        hours += Math.floor(minutes / 60);
        minutes = minutes % 60;
      }
    }

    return minutes < 10 ? `${hours}:0${minutes}` : `${hours}:${minutes}`;
  }

  getPossibleRemainingPeriodDuration(): string {
    const periodsTotalDuration = this.getPeriodsTotalDuration();
    const possibleRemainingHours = 23 - Number(periodsTotalDuration.split(':')[0]);
    const possibleRemainingMinutes = 55 - Number(periodsTotalDuration.split(':')[1]);

    const hours = possibleRemainingHours > 0 ? possibleRemainingHours : 0;
    const minutes = possibleRemainingMinutes >= 10 ? possibleRemainingMinutes : `0${possibleRemainingMinutes}`;

    return `${hours}:${minutes}`;
  }

  private getYesterdaySelector(): WebdriverIO.Element {
    const $weekDays = $(this.weekViewer).$$('div.day');

    return $weekDays[$weekDays.length - 2];
  }

  getTotalDuration(): string {
    return getText($('div.progress-block > div > span:nth-child(1)'));
  }

  getWidgetDayDate(): string {
    return getText($(this.widgetTitle)).split(' ')[2];
  }

  getWidgetDayName(): string {
    return getText($(this.widgetTitle)).split(' / ')[0];
  }

  getWidgetUnreportedDays(): string {
    const $unreportedDays = $$('.unreported-day a');

    return $unreportedDays.map($unreportedDay => getText($unreportedDay)).join('~');
  }

  isAddPeriodButtonDisplayed(): boolean {
    return isDisplayed($(this.addPeriodButton));
  }

  isAddPeriodButtonEnabled(): boolean {
    return $(this.addPeriodButton).isEnabled();
  }

  isDisplayed(): boolean {
    return isDisplayed($(this.weekViewer));
  }

  isPlayButtonDiplayed(): boolean {
    return isDisplayed($(this.playPauseButtonContainer).$('i.play'));
  }

  isPeriodExists(description: string, duration: string, project: string): boolean {
    const hash = $$(this.period).map($period => {
      const periodDuration = this.getPeriodDuration($period);
      const periodDescription = this.getPeriodDescription($period);
      const periodProjectName = this.getPeriodProjectName($period);

      return `${periodDescription}~${periodDuration}~${periodProjectName}`;
    }).join('~');

    return hash.includes(`${description}~${duration}~${project}`);
  }

  isPauseButtonDiplayed(): boolean {
    return isDisplayed($(this.playPauseButtonContainer).$('i.pause'));
  }

  isRemovePeriodButtonDisplayed(period: WebdriverIO.Element): boolean {
    return isDisplayed(period);
  }

  isRequestOvertimeButtonDisplayed(): boolean {
    return isDisplayed($(this.requestOvertimeButton));
  }

  isRequestOvertimeButtonEnabled(): boolean {
    const state = $(this.requestOvertimeButton).getAttribute('disabled');

    return !JSON.parse(state || null);
  }

  isTodayButtonDisplayed(): boolean {
    return isDisplayed($(this.todayButton));
  }

  navigate(): void {
    clickOnElement($('#menu').$('[href$="/time"]'));
    browser.waitUntil(() => this.isDisplayed());
  }

  removePeriod(period: WebdriverIO.Element): void {
    const removePeriodDialog = new RemovePeriodDialog();
    const periodsCount = this.getPeriodsCount();

    this.clickOnDeletePeriodButton(period);
    browser.waitUntil(() => removePeriodDialog.isDisplayed());

    removePeriodDialog.clickOnSubmitButton();
    browser.waitUntil(() => removePeriodDialog.isDisplayed() === false);

    browser.waitUntil(() => this.getPeriodsCount() !== periodsCount);
  }
}
