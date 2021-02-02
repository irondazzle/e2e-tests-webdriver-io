import { RequestVacationPage } from '@e2e/page-objects';

describe('Remove vacation request for two months in advance', () => {
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

  it('pending vacation days count should be more than zero', () => {
    expect(requestVacationPage.getPendingVacationDaysCount()).toBeGreaterThan(0);
  });

  it('should remove vacation request', () => {
    const pendingVacationDays = requestVacationPage.getPendingVacationDaysCount();

    requestVacationPage.removePendingVacationDays();

    requestVacationPage.clickOnSubmitButton();
    browser.waitUntil(() => requestVacationPage.getPendingVacationDaysCount() !== pendingVacationDays);

    expect(requestVacationPage.getPendingVacationDaysCount()).toBe(0);
  });
});
