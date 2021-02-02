import { clickOnElement, getText, isDisplayed, isSuccessToastDisplayed } from '@e2e/helpers/common-helper';

import { en } from '@e2e/i18n/en';

import { RejectOvertimeRequestDialog } from './reject-overtime-request-dialog.po';
import { StatsBasePage } from './stats-base.po';

export class OvertimeRequestsPage extends StatsBasePage {
  private readonly rejectButton: string = `span=${en.reject}`;

  constructor() {
    super('div#overtime-requests', '[href$="/overtime-requests"]')
  }

  clickOnRejectButton(): void {
    clickOnElement($(this.rejectButton));
  }

  clickOnSelectEmployeeButton(employeeFullName: string): void {
    clickOnElement(this.getEmployeeSelector(employeeFullName).$('td.center label'));
  }

  getEmployeeComment(employeeFullName: string): string {
    return getText(this.getEmployeeSelector(employeeFullName).$$('td')[3]);
  }

  private getEmployeeSelector(employeeFullName: string): WebdriverIO.Element {
    return $(`//*[td="${employeeFullName}"]`);
  }

  isEmployeeDisplayed(employeeFullName: string): boolean {
    return isDisplayed(this.getEmployeeSelector(employeeFullName));
  }

  rejectRequest(employeeFullName: string): void {
    const rejectOvertimeRequestDialog = new RejectOvertimeRequestDialog();

    this.clickOnSelectEmployeeButton(employeeFullName);
    this.clickOnRejectButton();
    browser.waitUntil(() => rejectOvertimeRequestDialog.isDisplayed());

    rejectOvertimeRequestDialog.setReason();

    rejectOvertimeRequestDialog.clickOnSubmitButton();
    browser.waitUntil(() => rejectOvertimeRequestDialog.isDisplayed() === false);
    browser.waitUntil(() => this.isEmployeeDisplayed(employeeFullName) === false);
    browser.waitUntil(() => isSuccessToastDisplayed());
  }
}
