import { randomNumber } from '@e2e/helpers/random-helper';

import { TimePreset } from '@e2e/models/time-preset-model';

import { AddPeriodSidenavTimePage, TimePage } from '@e2e/page-objects';

describe('Add period for yesterday', () => {
  const addPeriodSidenavTimePage = new AddPeriodSidenavTimePage();
  const isMonday: boolean = new Date().getDay() === 1;
  const timePage = new TimePage();
  let $periods: WebdriverIO.ElementArray;

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
  });

  it('add new period button should be displayed', () => {
    expect(timePage.isAddPeriodButtonDisplayed()).toBe(true);
  });

  it('should set yesterday', () => {
    const yesterday = new Date(Date.now() - 86400000).toString().split(' ')[2];

    timePage.clickOnTodayButton();
    timePage.clickOnYesterday();

    browser.waitUntil(() => timePage.isAddPeriodButtonEnabled());
    browser.waitUntil(() => timePage.getActiveDayName() === timePage.getWidgetDayName());

    expect(timePage.getWidgetDayDate()).toBe(yesterday);
  });

  it('periods count should be equal to zero', () => {
    if (timePage.getPeriodsCount()) {
      const oldWidgetUnreportedDays = timePage.getWidgetUnreportedDays();

      $periods = timePage.getPeriods();

      for (const $period of $periods) {
        timePage.removePeriod($period);
      }

      browser.waitUntil(() => timePage.getWidgetUnreportedDays() !== oldWidgetUnreportedDays);
    }

    expect(timePage.getPeriodsCount()).toBe(0);
  });

  if (!isMonday) {
    it('should check that yesterday is unreported', () => {
      expect(timePage.getWidgetUnreportedDays()).toContain(timePage.getActiveDayDate());
    });
  }

  it('sidenav`s add period button should be displayed', () => {
    timePage.clickOnAddPeriodButton();
    browser.waitUntil(() => addPeriodSidenavTimePage.isDisplayed());

    expect(addPeriodSidenavTimePage.isAddButtonDisplayed()).toBe(true);
  });

  it('submit button should be disabled', () => {
    expect(addPeriodSidenavTimePage.isAddButtonEnabled()).toBe(false);

    addPeriodSidenavTimePage.clickOnCloseButton();
  });

  addPeriodThroughDropDownTab(TimePreset.QuarterOfAnHour);
  addPeriodThroughDropDownTab(TimePreset.HalfAnHour);
  addPeriod();
  addPeriod();

  if (!isMonday) {
    it('should check that yesterday is reported', () => {
      expect(timePage.getWidgetUnreportedDays()).not.toContain(timePage.getActiveDayDate());
    });
  }

  afterAll(() => {
    $periods = timePage.getPeriods();

    for (const $period of $periods) {
      timePage.removePeriod($period);
    }
  });
});
