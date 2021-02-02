import { isDisplayed } from '@e2e/helpers/common-helper';

import { EntitiesBasePage } from '../entities-base.po';

export class CostCenterPage extends EntitiesBasePage {
  private readonly costCenterNameField: string = 'input#name';

  getCostCenterName(): string {
    return $(this.costCenterNameField).getValue();
  }

  isCostCenterNameFieldDisplayed(): boolean {
    return isDisplayed($(this.costCenterNameField));
  }

  setCostCenterName(): void {
    const $costCenterNameField = $(this.costCenterNameField);

    $costCenterNameField.clearValue();
    $costCenterNameField.setValue(`Cost Center | ${new Date().getTime()}`);
  }
}
