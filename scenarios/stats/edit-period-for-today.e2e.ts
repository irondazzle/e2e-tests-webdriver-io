import { addDurations, isSuccessToastDisplayed, setStringTypeTime } from '@e2e/helpers/common-helper';
import { randomNumber } from '@e2e/helpers/random-helper';

import { TimePreset } from '@e2e/models/time-preset-model';

import { StatsDatePicker, StatsPage, TimePage } from '@e2e/page-objects';

describe('Edit period for today', () => {
  const statsPage = new StatsPage();
  const timePage = new TimePage();
  const today = new Date().toString().split(' ')[2];
  let $periods: WebdriverIO.ElementArray;
  let duration: string;
  let totalDuration: string;

  function addPeriod() {
    const randomKey = Object.entries(TimePreset)[randomNumber(0, Object.keys(TimePreset).length - 1)][0];

    it(`should add period with ${TimePreset[randomKey]} duration`, () => {
      const [description, duration, project] = timePage.addPeriod(TimePreset[randomKey]);

      expect(timePage.isPeriodExists(description, duration, project)).toBe(true);
    });
  }

  function addPeriodThroughDropDownTab(timePreset: TimePreset) {
    it(`should add period with ${timePreset} duration`, () => {
      const [description, duration, project] = timePage.addPeriod(timePreset, true);

      expect(timePage.isPeriodExists(description, duration, project)).toBe(true);
    });
  }

  beforeAll(() => {
    timePage.navigate();

    browser.waitUntil(() => timePage.isAddPeriodButtonEnabled());
  });

  it('today button should be displayed', () => {
    expect(timePage.isTodayButtonDisplayed()).toBe(true);
  });

  it('should set today date', () => {
    timePage.clickOnTodayButton();
    browser.waitUntil(() => timePage.getActiveDayName() === timePage.getWidgetDayName());

    expect(timePage.getWidgetDayDate()).toBe(today);
  });

  addPeriodThroughDropDownTab(TimePreset.QuarterOfAnHour);
  addPeriod();

  it('should get today`s duration', () => {
    duration = timePage.getActiveDayTotalDuration();

    expect(duration).toBeTruthy();
  });

  it('should get total duration', () => {
    totalDuration = timePage.getTotalDuration();

    expect(totalDuration).toBeTruthy();
  });

  it('search button should be displayed', () => {
    statsPage.navigate();

    expect(statsPage.isSearchButtonDisplayed()).toBe(true);
  });

  it('date pickers should be displayed', () => {
    expect(statsPage.isDatePickerFromFieldDisplayed()).toBe(true, 'from');
    expect(statsPage.isDatePickerToFieldDisplayed()).toBe(true, 'to');
  });

  it('should check that total duration is correct', () => {
    //NOTE: By default, the search button is enabled after navigation.
    //After that back-end request is sent and the button becomes disabled for request duration.
    browser.waitUntil(() => statsPage.isSearchButtonEnabled() === false);

    browser.waitUntil(() => statsPage.isSearchButtonEnabled());

    expect(statsPage.getTotalDuration()).toBe(totalDuration);
  });

  it('should set today in date pickers', () => {
    const datePickerFrom = new StatsDatePicker(statsPage.getDatePickerId(0));

    statsPage.clickOnDatePickerFrom();
    browser.waitUntil(() => datePickerFrom.isDisplayed());
    browser.waitUntil(() => datePickerFrom.isTodayDisplayed());

    datePickerFrom.setDay(new Date().getDate());

    datePickerFrom.clickOnSubmitButton();
    browser.waitUntil(() => datePickerFrom.isDisplayed() === false);

    expect(statsPage.getDatePickerFromDate()).toBe(today, 'from');
    expect(statsPage.getDatePickerToDate()).toBe(today, 'to');
  });

  it('should check that daily duration is correct', () => {
    statsPage.clickOnSearchButton();
    browser.waitUntil(() => statsPage.isSearchButtonEnabled() === false);
    browser.waitUntil(() => statsPage.isSearchButtonEnabled());

    expect(statsPage.getDailyDuration()).toBe(duration);
  });

  it('should edit period', () => {
    $periods = statsPage.getPeriods();

    const $period = $periods[1];

    statsPage.clickOnEditPeriodButton($period);

    const periodDescription = statsPage.setPeriodDescription($period);
    const periodDuration = statsPage.setPeriodDuration($period, setStringTypeTime(randomNumber(1, 5), randomNumber(5, 55)));

    statsPage.clickOnEditPeriodButton($period);
    browser.waitUntil(() => isSuccessToastDisplayed());

    expect(statsPage.getPeriodDuration($period)).toBe(periodDuration, 'Duration');
    expect(statsPage.getPeriodDescription($period)).toBe(periodDescription, 'Description');
  });

  it('should check that total and daily durations are correct after edit', () => {
    totalDuration = addDurations(statsPage.getPeriodDuration($periods[0]), statsPage.getPeriodDuration($periods[1]));

    expect(statsPage.getTotalDuration()).toBe(totalDuration, 'Total duration');
    expect(statsPage.getDailyDuration()).toBe(totalDuration, 'Daily duration');
  });

  afterAll(() => {
    $periods = statsPage.getPeriods();

    for (const $period of $periods) {
      statsPage.removePeriod($period);
    }
  });
});
