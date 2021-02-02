import { randomNumber } from '@e2e/helpers/random-helper';

import { TimePreset } from '@e2e/models/time-preset-model';

import { AddPeriodSidenavStatsPage, StatsDatePicker, StatsPage, TimePage } from '@e2e/page-objects';

describe('Add period for today', () => {
  const addPeriodSidenavStatsPage = new AddPeriodSidenavStatsPage();
  const statsPage = new StatsPage();
  const timePage = new TimePage();
  const today = new Date().toString().split(' ')[2];
  let duration: string;
  let todayPeriodsHash: string;
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
  addPeriod();

  it('should get today`s duration', () => {
    duration = timePage.getActiveDayTotalDuration();

    expect(duration).toBeTruthy();
  });

  it('should get today`s periods', () => {
    todayPeriodsHash = timePage.getDailyPeriodsHash();

    expect(todayPeriodsHash).toBeTruthy();
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

  it('should check that daily periods are correct', () => {
    expect(statsPage.getDailyPeriodsHash()).toBe(todayPeriodsHash);
  });

  it('add new period button should be displayed', () => {
    expect(statsPage.isAddPeriodButtonDisplayed()).toBe(true);
  });

  it('sidenav`s add period button should be displayed', () => {
    statsPage.clickOnAddPeriodButton();

    browser.waitUntil(() => addPeriodSidenavStatsPage.isDisplayed());
    expect(addPeriodSidenavStatsPage.isAddButtonDisplayed()).toBe(true);
  });

  it('submit button should be disabled', () => {
    expect(addPeriodSidenavStatsPage.isAddButtonEnabled()).toBe(false);
  });

  it('timepicker should be displayed', () => {
    expect(addPeriodSidenavStatsPage.isTimePickerDisplayed()).toBe(true);
  });

  it(`should add period with 3h duration`, () => {
    const periodsCount = statsPage.getPeriodsCount();

    browser.waitUntil(() => addPeriodSidenavStatsPage.isDatePickerDisplayed());
    addPeriodSidenavStatsPage.setTodayDate();

    expect(addPeriodSidenavStatsPage.isTodayDaySelected()).toBe(true, 'Date picker date is not selected');

    addPeriodSidenavStatsPage.setTimePreset(TimePreset.ThreeHours);

    const duration = addPeriodSidenavStatsPage.getTimePickerValue();
    const project = addPeriodSidenavStatsPage.setTasks();
    const description = addPeriodSidenavStatsPage.setDescription();

    addPeriodSidenavStatsPage.clickOnAddPeriodButton();
    browser.waitUntil(() => addPeriodSidenavStatsPage.isDisplayed());
    browser.waitUntil(() => statsPage.getPeriodsCount() > periodsCount);

    expect(statsPage.getDailyPeriodsHash()).toBe(`${todayPeriodsHash}~${project}~${description}~${duration}`);
  });

  afterAll(() => {
    const $periods = statsPage.getPeriods();

    for (const $period of $periods) {
      statsPage.removePeriod($period);
    }
  });
});
