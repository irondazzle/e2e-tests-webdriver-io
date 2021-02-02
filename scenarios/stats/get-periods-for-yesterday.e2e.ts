import { randomNumber } from '@e2e/helpers/random-helper';

import { TimePreset } from '@e2e/models/time-preset-model';

import { StatsDatePicker, StatsPage, TimePage } from '@e2e/page-objects';

describe('Get periods for yesterday', () => {
  const statsPage = new StatsPage();
  const timePage = new TimePage();
  const yesterdayFormatted = new Date(Date.now() - 86400000).toString().split(' ')[2];
  let totalDuration: string;
  let yesterdayDuration: string;
  let yesterdayPeriodsHash: string;

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

  it('should set yesterday', () => {
    timePage.clickOnTodayButton();
    timePage.clickOnYesterday();

    browser.waitUntil(() => timePage.getActiveDayName() === timePage.getWidgetDayName());

    expect(timePage.getWidgetDayDate()).toBe(yesterdayFormatted);
  });

  addPeriodThroughDropDownTab(TimePreset.QuarterOfAnHour);
  addPeriod();
  addPeriod();

  it('should get yesterday duration', () => {
    yesterdayDuration = timePage.getActiveDayTotalDuration();

    expect(yesterdayDuration).toBeTruthy();
  });

  it('should get total duration', () => {
    totalDuration = timePage.getTotalDuration();

    expect(totalDuration).toBeTruthy();
  });

  it('should get yesterday periods', () => {
    yesterdayPeriodsHash = timePage.getDailyPeriodsHash();

    expect(yesterdayPeriodsHash).toBeTruthy();
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

  it('should set yesterday in date pickers', () => {
    const datePickerFrom = new StatsDatePicker(statsPage.getDatePickerId(0));
    const datePickerTo = new StatsDatePicker(statsPage.getDatePickerId(1));
    const yesterday = new Date().getDate() - 1;

    statsPage.clickOnDatePickerTo();
    browser.waitUntil(() => datePickerTo.isDisplayed());
    browser.waitUntil(() => datePickerTo.isTodayDisplayed());

    datePickerTo.setDay(yesterday);

    datePickerTo.clickOnSubmitButton();
    browser.waitUntil(() => datePickerTo.isDisplayed() === false);

    statsPage.clickOnDatePickerFrom();
    browser.waitUntil(() => datePickerFrom.isDisplayed());
    browser.waitUntil(() => datePickerFrom.isTodayDisplayed());

    datePickerFrom.setDay(yesterday);

    datePickerFrom.clickOnSubmitButton();
    browser.waitUntil(() => datePickerFrom.isDisplayed() === false);

    expect(statsPage.getDatePickerFromDate()).toBe(yesterdayFormatted, 'from');
    expect(statsPage.getDatePickerToDate()).toBe(yesterdayFormatted, 'to');
  });

  it('should check that daily duration is correct', () => {
    statsPage.clickOnSearchButton();
    browser.waitUntil(() => statsPage.isSearchButtonEnabled() === false);
    browser.waitUntil(() => statsPage.isSearchButtonEnabled());

    expect(statsPage.getDailyDuration()).toBe(yesterdayDuration);
  });

  it('should check that daily periods are correct', () => {
    expect(statsPage.getDailyPeriodsHash()).toBe(yesterdayPeriodsHash);
  });

  afterAll(() => {
    const $periods = statsPage.getPeriods();

    for (const $period of $periods) {
      statsPage.removePeriod($period);
    }
  });
});
