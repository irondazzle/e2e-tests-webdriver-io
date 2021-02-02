import { clickOnElement } from '@e2e/helpers/common-helper';
import { randomNumber, randomText } from '@e2e/helpers/random-helper';

import { EntitiesBasePage } from '../entities-base.po';

export class SowPage extends EntitiesBasePage {
  private readonly autoCloseDatePicker: string = 'input#auto-close-date';
  private readonly sowIdField: string = '#sow_id';
  private readonly sowNameField: string = '#sow_name';
  readonly contactDetailsField: string = '#contact_details';
  readonly contactPersonField: string = '#contact_person';
  readonly endDatePicker: string = 'input#end-date';
  readonly startDatePicker: string = 'input#start-date';

  clickOnAutoCloseDatePicker(): void {
    clickOnElement($(this.autoCloseDatePicker));
  }

  getAutoCloseDatePickerDate(): string {
    return $(this.autoCloseDatePicker).getAttribute('value').replace(',', '').split(' ')[1];
  }

  getContactDetails(): string {
    return $(this.contactDetailsField).getValue();
  }

  getContactPerson(): string {
    return $(this.contactPersonField).getValue();
  }

  getDatePickerIds(): string[] {
    return $$('div.datepicker-modal').map($datePicker => $datePicker.getAttribute('id'));
  }

  getEndDatePickerDate(): string {
    return $(this.endDatePicker).getAttribute('value').replace(',', '').split(' ')[1];
  }

  getSowId(): string {
    return $(this.sowIdField).getValue();
  }

  getSowName(): string {
    return $(this.sowNameField).getValue();
  }

  getStartDatePickerDate(): string {
    return $(this.startDatePicker).getAttribute('value').replace(',', '').split(' ')[1];
  }

  isEndDatePickerEnabled(): boolean {
    return $(this.endDatePicker).isEnabled();
  }

  isSowIdFieldEnabled(): boolean {
    return $(this.sowIdField).isEnabled();
  }

  isStartDatePickerEnabled(): boolean {
    return $(this.startDatePicker).isEnabled();
  }

  setContactDetails(): string {
    const $contactDetailsField = $(this.contactDetailsField);
    const details = `${randomText(4, 20)}`;

    $contactDetailsField.clearValue();
    $contactDetailsField.setValue(details);

    return details;
  }

  setContactPerson(): string {
    const $contactPersonField = $(this.contactPersonField);
    const peson = `Person - ${randomText(1, 6)}`;

    $contactPersonField.clearValue();
    $contactPersonField.setValue(peson);

    return peson;
  }

  setSowId(): string {
    const $sowIdField = $(this.sowIdField);
    const id = `${randomNumber(0, 9999)}`;

    $sowIdField.clearValue();
    $sowIdField.setValue(id);

    return id;
  }

  setSowName(): string {
    const $sowNameField = $(this.sowNameField);
    const name = `SOW | ${randomText(2, 6)} | ${randomText(2, 5)}`;

    $sowNameField.clearValue();
    $sowNameField.setValue(name);

    return name;
  }
}
