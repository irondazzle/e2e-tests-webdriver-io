import { clickOnElement, isDisplayed } from '@e2e/helpers/common-helper';

import { en } from '@e2e/i18n/en';

import { LeavesAndAbsencesPage } from './leaves-and-absences.po';
import { RejectSickLeaveDialog } from './reject-sick-leave-dialog.po';

export class ReportsSickLeavesPage extends LeavesAndAbsencesPage {
  private readonly actionsContainer: string = 'div.action-footer';
  private readonly approveButton: string = `button=${en.approve.toLocaleLowerCase()}`;
  private readonly radioButtonContainer: string = '.radio-inline';
  private readonly rejectButton: string = `a=${en.reject.toLocaleLowerCase()}`;
  private readonly requestsContainer: string = 'div.request-table';

  constructor() {
    super('div.container', '[href$="/requests-sick-leaves"]');
  }

  approveSickLeave(employeeFullName: string): void {
    this.clickOnEmployeeCheckbox(employeeFullName);

    this.clickOnApproveButton();
    browser.waitUntil(() => this.isEmployeeDisplayed(employeeFullName) === false);
  }

  clickOnApproveButton(): void {
    clickOnElement($(this.actionsContainer).$(this.approveButton));
  }

  clickOnEmployeeCheckbox(employeeFullName: string): void {
    clickOnElement(this.getEmployeeSelector(employeeFullName).$('label'));
  }

  clickOnMyTeamRadioButton(): void {
    clickOnElement($(this.radioButtonContainer).$$('label')[0]);
  }

  clickOnOtherRadioButton(): void {
    clickOnElement($(this.radioButtonContainer).$$('label')[1]);
  }

  clickOnRejectButton(): void {
    clickOnElement($(this.actionsContainer).$(this.rejectButton));
  }

  private getEmployeeSelector(employeeFullName: string): WebdriverIO.Element {
    return $(`[e2e-value="${employeeFullName}"]`);
  }

  isApproveButtonDisplayed(): boolean {
    return isDisplayed($(this.actionsContainer).$(this.approveButton));
  }

  isApproveButtonEnabled(): boolean {
    return $(this.actionsContainer).$(this.approveButton).isEnabled();
  }

  isEmployeeDisplayed(employeeFullName: string): boolean {
    return isDisplayed(this.getEmployeeSelector(employeeFullName));
  }

  isRejectButtonDisplayed(): boolean {
    return isDisplayed($(this.actionsContainer).$(this.rejectButton));
  }

  isRequestsTableDisplayed(): boolean {
    return isDisplayed($(this.requestsContainer));
  }

  rejectSickLeave(employeeFullName: string): void {
    const rejectSickLeaveDialog = new RejectSickLeaveDialog();

    this.clickOnEmployeeCheckbox(employeeFullName);

    this.clickOnRejectButton();
    browser.waitUntil(() => rejectSickLeaveDialog.isDisplayed());

    rejectSickLeaveDialog.setReason();

    rejectSickLeaveDialog.clickOnSubmitButton();
    browser.waitUntil(() => rejectSickLeaveDialog.isDisplayed() === false);
    browser.waitUntil(() => this.isEmployeeDisplayed(employeeFullName) === false);
  }
}
