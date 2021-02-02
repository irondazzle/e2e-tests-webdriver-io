import { clickOnElement, isDisplayed } from '@e2e/helpers/common-helper';

import { EntitiesBasePage } from '../entities-base.po';

export class EngagementPage extends EntitiesBasePage {
  private readonly clientNameField: string = '#engagement_client';
  private readonly datePicker: string = 'input#start-date';
  private readonly engagementNameField: string = '#engagement_name';
  private readonly pipeDriveDealNameField: string = '#deal_name';
  private readonly pipeDriveIdField: string = '#engagement_pipedrive';

  clickOnDatePicker(): void {
    clickOnElement($(this.datePicker));
  }

  getDatePickerDate(): string {
    return $(this.datePicker).getAttribute('value').replace(',', '').split(' ')[1];
  }

  getClientName(): string {
    return $(this.clientNameField).getValue();
  }

  getDatePickerId(): string {
    return $('div.datepicker-modal').getAttribute('id');
  }

  getEngagementName(): string {
    return $(this.engagementNameField).getValue();
  }

  getPipeDriveDealName(): string {
    return $(this.pipeDriveDealNameField).getValue();
  }

  isClientNameFieldEnabled(): boolean {
    return $(this.clientNameField).isEnabled();
  }

  isEngagementNameFieldDisplayed(): boolean {
    return isDisplayed($(this.engagementNameField));
  }

  isPipeDriveDealNameFieldEnabled(): boolean {
    return $(this.pipeDriveDealNameField).isEnabled();
  }

  isPipeDriveFieldEnabled(): boolean {
    return $(this.pipeDriveIdField).isEnabled();
  }

  setEngagementName(): void {
    const $engagementNameField = $(this.engagementNameField);

    $engagementNameField.clearValue();
    $engagementNameField.setValue(`Engagement ${new Date().getTime()}`);
  }
}
