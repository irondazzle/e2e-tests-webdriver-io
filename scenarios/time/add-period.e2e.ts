import { TimePreset } from '@e2e/models/time-preset-model';

import { AddPeriodSidenavTimePage, TimePage } from '@e2e/page-objects';

describe('Add period', () => {
  const addPeriodSidenavTimePage = new AddPeriodSidenavTimePage();
  const timePage = new TimePage();

  function addPeriod(timePreset: TimePreset) {
    it(`should add period with ${timePreset} duration`, () => {
      const [description, duration, project] = timePage.addPeriod(timePreset);

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
  addPeriod(TimePreset.OneHour);
  addPeriod(TimePreset.TwoHours);
  addPeriod(TimePreset.ThreeHours);

  afterAll(() => {
    const $periods = timePage.getPeriods();

    for (const $period of $periods) {
      timePage.removePeriod($period);
    }
  });
});
