import { clickOnElement } from '@e2e/helpers/common-helper';

import { SowFields } from '@e2e/models/sow-fields-model';

import { SowPage } from './sow.po';

export class CreateSowPage extends SowPage {
  clickOnEndDatePicker(): void {
    clickOnElement($(this.endDatePicker));
  }

  clickOnStartDatePicker(): void {
    clickOnElement($(this.startDatePicker));
  }

  isClientFieldEnabled(): boolean {
    return $$(this.fields)[SowFields.Client].$('input').isEnabled();
  }

  isContactDetailsFieldEnabled(): boolean {
    return $(this.contactDetailsField).isEnabled();
  }

  isContactPersonFieldEnabled(): boolean {
    return $(this.contactPersonField).isEnabled();
  }

  isOwnerFieldEnabled(): boolean {
    return $$(this.fields)[SowFields.Owner].$('input').isEnabled();
  }
}
