import { randomNumber } from '@e2e/helpers/random-helper';

import { TimePreset } from '@e2e/models/time-preset-model';

import { RemovePeriodDialog, TimePage } from '@e2e/page-objects';

describe('Remove period', () => {
  const removePeriodDialog = new RemovePeriodDialog();
  const timePage = new TimePage();
  let $periods: WebdriverIO.ElementArray;
  let periodsCount: number;

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

  addPeriodThroughDropDownTab(TimePreset.QuarterOfAnHour);
  addPeriod();

  it('should check that there are reported periods', () => {
    periodsCount = timePage.getPeriodsCount();

    expect(periodsCount).toBeGreaterThan(0);
  });

  it('should check that durations are correct', () => {
    expect(timePage.getPeriodsTotalDuration()).toBe(timePage.getActiveDayTotalDuration());
  });

  it('remove period button(s) should be displayed', () => {
    $periods = timePage.getPeriods();

    for (const $period of $periods) {
      expect(timePage.isRemovePeriodButtonDisplayed($period)).toBe(true);
    }
  });

  it('should remove periods', () => {
    for (const $period of $periods) {
      const periodDescription = timePage.getPeriodDescription($period);
      const periodDuration = timePage.getPeriodDuration($period);
      const periodProjectName = timePage.getPeriodProjectName($period);

      timePage.clickOnDeletePeriodButton($period);
      browser.waitUntil(() => removePeriodDialog.isDisplayed());

      removePeriodDialog.clickOnSubmitButton();
      browser.waitUntil(() => removePeriodDialog.isDisplayed() === false);

      browser.waitUntil(() => timePage.getPeriodsCount() !== periodsCount);

      expect(timePage.isPeriodExists(periodDescription, periodDuration, periodProjectName)).toBe(false, 'Period exists');
      expect(timePage.getPeriodsTotalDuration()).toBe(timePage.getActiveDayTotalDuration(), 'Duration incorrect');
    }
  });
});
