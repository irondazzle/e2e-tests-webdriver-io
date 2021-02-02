import { addDurations, setStringTypeTime } from '@e2e/helpers/common-helper';
import { randomNumber } from '@e2e/helpers/random-helper';

import { TimePreset } from '@e2e/models/time-preset-model';

import { AddPeriodSidenavTimePage, TimePage } from '@e2e/page-objects';

describe('Edit period', () => {
  const addPeriodSidenavTimePage = new AddPeriodSidenavTimePage();
  const timePage = new TimePage();
  let description: string;
  let duration: string;
  let periodsCount: number;
  let project: string;

  function addPeriod() {
    const randomTime = setStringTypeTime(randomNumber(1, 6), randomNumber(5, 55));

    it(`should add period with ${randomTime} duration`, () => {
      const [description, duration, project] = timePage.addPeriod(randomTime, true);

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

  addPeriod();
  addPeriod();

  it('should edit one of periods', () => {
    periodsCount = timePage.getPeriodsCount();

    const $period = timePage.getPeriod(randomNumber(0, periodsCount - 1));
    const activeDayDuration = timePage.getActiveDayTotalDuration();

    timePage.clickOnPeriod($period);
    browser.waitUntil(() => addPeriodSidenavTimePage.isDisplayed());

    addPeriodSidenavTimePage.clickOnLatestProjectsTab();

    addPeriodSidenavTimePage.setTimePreset(TimePreset.EightHours);
    duration = addPeriodSidenavTimePage.getTimePickerValue();
    project = addPeriodSidenavTimePage.setLatestProject();
    description = addPeriodSidenavTimePage.setDescription();

    addPeriodSidenavTimePage.clickOnAddPeriodButton();
    browser.waitUntil(() => addPeriodSidenavTimePage.isDisplayed() === false);
    browser.waitUntil(() => timePage.getActiveDayTotalDuration() !== activeDayDuration);

    expect(timePage.isPeriodExists(description, duration, project)).toBe(true, `${description}, ${duration}, ${project}`);
  });

  it('should check that active day duration is correct', () => {
    const firstPeriodDuration = timePage.getPeriodDuration(timePage.getPeriod(0));
    const secondPeriodDuration = timePage.getPeriodDuration(timePage.getPeriod(1));

    const activeDayDuration = addDurations(firstPeriodDuration, secondPeriodDuration);

    expect(timePage.getActiveDayTotalDuration()).toBe(activeDayDuration);
  });

  afterAll(() => {
    const $periods = timePage.getPeriods();

    for (const $period of $periods) {
      timePage.removePeriod($period);
    }
  });
});
