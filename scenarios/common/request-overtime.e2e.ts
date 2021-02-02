import { logInAsUser } from '@e2e/helpers/authorization-helper';
import { Admin, User } from '@e2e/helpers/users-helper';

import { OvertimeRequestsPage, RequestOvertimeDialog, TimePage } from '@e2e/page-objects';

describe('Request overtime', () => {
  const overtimeRequestsPage = new OvertimeRequestsPage();
  const requestOvertimeDialog = new RequestOvertimeDialog();
  const timePage = new TimePage();
  let overtimeButtonState: boolean;
  let reason: string;

  beforeAll(() => {
    timePage.navigate();
  });

  it('request overtime button should be displayed', () => {
    browser.waitUntil(() => timePage.isAddPeriodButtonEnabled());

    expect(timePage.isRequestOvertimeButtonDisplayed()).toBe(true);
  });

  it('request overtime button should be enabled', () => {
    overtimeButtonState = timePage.isRequestOvertimeButtonEnabled();

    expect(overtimeButtonState).toBe(true);
  });

  it('submit button should be disabled', () => {
    timePage.clickOnRequestOvertimeButton();
    browser.waitUntil(() => requestOvertimeDialog.isDisplayed());

    expect(requestOvertimeDialog.isSubmitButtonEnabled()).toBe(false);
  });

  it('submit button should be enabled after reason setup', () => {
    reason = requestOvertimeDialog.setReason();

    expect(requestOvertimeDialog.isSubmitButtonEnabled()).toBe(true);
  });

  it('should request overtime', () => {
    requestOvertimeDialog.clickOnSubmitButton();
    browser.waitUntil(() => requestOvertimeDialog.isDisplayed() === false);
    browser.waitUntil(() => timePage.isRequestOvertimeButtonEnabled() !== overtimeButtonState);

    expect(timePage.isRequestOvertimeButtonEnabled()).toBe(false);
  });

  it('employee overtime request should be displayed', () => {
    logInAsUser(Admin.id);

    overtimeRequestsPage.navigate();
    browser.waitUntil(() => overtimeRequestsPage.isEmployeeDisplayed(User.fullName));

    expect(overtimeRequestsPage.getEmployeeComment(User.fullName)).toBe(reason);
  });

  afterAll(() => {
    overtimeRequestsPage.rejectRequest(User.fullName);
  });
});
