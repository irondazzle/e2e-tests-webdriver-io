import { clickOnElement, getText, isDisplayed } from '@e2e/helpers/common-helper';
import { randomText } from '@e2e/helpers/random-helper';

import { TimePreset } from '@e2e/models/time-preset-model';

export abstract class AddPeriodSidenav {
  private readonly timePicker = 'div#timepicker';

  constructor(readonly container: string, readonly addPeriodButton: string, readonly descriptionField: string) {
    this.container = container;
    this.addPeriodButton = addPeriodButton;
    this.descriptionField = descriptionField;
  }

  clickOnAddPeriodButton(): void  {
    clickOnElement($(this.container).$(this.addPeriodButton));
  }

  getTimePickerValue(): string {
    const hours = getText($(this.timePicker).$('.hours span'));
    const minutes = getText($(this.timePicker).$('.minutes span'));

    return `${hours}:${minutes}`;
  }

  isAddButtonDisplayed(): boolean {
    return isDisplayed($(this.container).$(this.addPeriodButton), true);
  }

  isAddButtonEnabled(): boolean {
    return $(this.container).$(this.addPeriodButton).isEnabled();
  }

  isDisplayed(): boolean {
    return isDisplayed($(this.container), true);
  }

  isTimePickerDisplayed(): boolean {
    return isDisplayed($(this.container).$(this.timePicker), true);
  }

  setDescription(): string {
    const $desriptionField = $(this.descriptionField);
    const text = randomText(10, 20);

    $desriptionField.clearValue();
    $desriptionField.setValue(text);

    return text;
  }

  setTime(time: string): void {
    const hours = Number(time.split(':')[0]);
    const minutes = Number(time.split(':')[1]);

    for (let i = 0; i < hours; i++) {
      clickOnElement($(this.timePicker).$('div.hours button.increase'));
    }

    for (let i = 0; i < (minutes / 5); i++) {
      clickOnElement($(this.timePicker).$('div.minutes button.increase'));
    }
  }

  setTimePreset(time: TimePreset): void {
    clickOnElement($(`button.preset=${time}`));
  }
}
