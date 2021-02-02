import { isSuccessToastDisplayed } from '@e2e/helpers/common-helper';

import { TimePreset } from '@e2e/models/time-preset-model';

import { AddPeriodSidenavTimePage, TimePage, TrackedTimeDialog } from '@e2e/page-objects';

describe('Add period by play/pause', () => {
  const addPeriodSidenavTimePage = new AddPeriodSidenavTimePage();
  const timePage = new TimePage();
  const trackedTimeDialog = new TrackedTimeDialog();

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

  it('play button should be displayed', () => {
     expect(timePage.isPlayButtonDiplayed()).toBe(true);
  });

  it('should click on play button', () => {
    timePage.clickOnPlayButton();
    browser.waitUntil(() => timePage.isPauseButtonDiplayed());

    expect(isSuccessToastDisplayed()).toBe(true);
  });

  it('should click on pause button', () => {
    timePage.clickOnPauseButton();
    browser.waitUntil(() => timePage.isPlayButtonDiplayed());

    expect(isSuccessToastDisplayed()).toBe(true);
  });

  it('tracked time modal window should not be displayed', () => {
    expect(trackedTimeDialog.isDisplayed()).toBe(false);
  });

  it('should click on play button and wait for 3 min', () => {
    timePage.clickOnPlayButton();
    browser.waitUntil(() => timePage.isPauseButtonDiplayed());

    const estimatedTime = new Date().getTime() + 180000;

    browser.waitUntil(() => new Date().getTime() >= estimatedTime);

    timePage.clickOnPauseButton();
    browser.waitUntil(() => trackedTimeDialog.isDisplayed());
    browser.waitUntil(() => timePage.isPlayButtonDiplayed());

    expect(timePage.isPauseButtonDiplayed()).toBe(false);
  });

  it('should add period with 0:05 duration', () => {
    trackedTimeDialog.clickOnAddNowButton();
    browser.waitUntil(() => addPeriodSidenavTimePage.isDisplayed());

    const periodsCount = timePage.getPeriodsCount();

    const duration = addPeriodSidenavTimePage.getTimePickerValue();
    const project = addPeriodSidenavTimePage.setLatestProject();
    const description = addPeriodSidenavTimePage.setDescription();

    addPeriodSidenavTimePage.clickOnAddPeriodButton();
    browser.waitUntil(() => timePage.getPeriodsCount() > periodsCount);

    expect(timePage.isPeriodExists(description, duration, project)).toBe(true);
  });

  it('should check that daily duration is correct', () => {
    expect(timePage.getActiveDayTotalDuration()).toBe('0:05');
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
