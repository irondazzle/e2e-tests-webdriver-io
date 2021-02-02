import { getErrorToastMessage, isErrorToastDisplayed } from '@e2e/helpers/common-helper';
import { randomNumber } from '@e2e/helpers/random-helper';

import { TimePreset } from '@e2e/models/time-preset-model';

import { AddPeriodSidenavTimePage, TimePage } from '@e2e/page-objects';

describe('Add period with maximum possible duration', () => {
  const addPeriodSidenavTimePage = new AddPeriodSidenavTimePage();
  const errorMessage = 'Total duration for one day can not be more then 23:55.'
  const timePage = new TimePage();
  let description: string;
  let duration: string;
  let periodsCount: number;
  let project: string;

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
  addPeriod();
  addPeriod();

  it('should add period with maximum possible duration', () => {
    const possibleRemainingPeriodDuration = timePage.getPossibleRemainingPeriodDuration();

    periodsCount = timePage.getPeriodsCount();

    timePage.clickOnAddPeriodButton();
    browser.waitUntil(() => addPeriodSidenavTimePage.isDisplayed());

    addPeriodSidenavTimePage.setTime(possibleRemainingPeriodDuration);

    duration = addPeriodSidenavTimePage.getTimePickerValue();
    project = addPeriodSidenavTimePage.setLatestProject();
    description = addPeriodSidenavTimePage.setDescription();

    addPeriodSidenavTimePage.clickOnAddPeriodButton();
    browser.waitUntil(() => timePage.getPeriodsCount() > periodsCount);

    expect(timePage.isPeriodExists(description, duration, project)).toBe(true, `${description}, ${duration}, ${project}`);
  });

  it('should check that not possible to add period when total duration is 23:55', () => {
    addPeriodSidenavTimePage.setTimePreset(TimePreset.ThreeHours);
    addPeriodSidenavTimePage.setLatestProject();
    addPeriodSidenavTimePage.setDescription();

    addPeriodSidenavTimePage.clickOnAddPeriodButton();
    browser.waitUntil(() => isErrorToastDisplayed());

    expect(getErrorToastMessage()).toBe(errorMessage);
  });

  afterAll(() => {
    addPeriodSidenavTimePage.clickOnCloseButton();
    browser.waitUntil(() => addPeriodSidenavTimePage.isDisplayed() === false);

    const $periods = timePage.getPeriods();

    for (const $period of $periods) {
      timePage.removePeriod($period);
    }
  });
});
