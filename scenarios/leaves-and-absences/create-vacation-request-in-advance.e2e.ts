import { RequestVacationPage } from '@e2e/page-objects';

describe('Create vacation request for two months in advance', () => {
  const requestVacationPage = new RequestVacationPage();

  beforeAll(() => {
    requestVacationPage.navigate();
  });

  it('request vacation page should be displayed', () => {
    expect(requestVacationPage.isDisplayed()).toBe(true);
  });

  it('date picker should be displayed', () => {
    expect(requestVacationPage.isDatePickerDisplayed()).toBe(true);
  });

  it('submit button should be displayed', () => {
    expect(requestVacationPage.isSubmitButtonDisplayed()).toBe(true);
  });

  it('available vacation days should be more than zero', () => {
    expect(requestVacationPage.getAvailableDays()).toBeGreaterThan(0);
  });

  it('should set today date', () => {
    requestVacationPage.clickOnTodayButton();

    expect(requestVacationPage.isCurrentDateDisplayed()).toBe(true);
  });

  it('should create vacation request for two months in advance', () => {
    requestVacationPage.clickOnNextMonth();
    requestVacationPage.clickOnNextMonth();

    const pendingVacationDays = requestVacationPage.getPendingVacationDaysCount();
    const requestedDaysHash = requestVacationPage.setVacationDays();

    requestVacationPage.clickOnSubmitButton();
    browser.waitUntil(() => requestVacationPage.getPendingVacationDaysCount() !== pendingVacationDays);

    expect(requestVacationPage.getPendingVacationDaysHash()).toBe(requestedDaysHash);
  });
});
