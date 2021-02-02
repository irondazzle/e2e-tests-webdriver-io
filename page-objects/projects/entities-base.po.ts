import { clickOnElement, getText, isDisplayed } from '@e2e/helpers/common-helper';
import { randomNumber } from '@e2e/helpers/random-helper';

import { en } from '@e2e/i18n/en';

import { ClientFields } from '@e2e/models/client-fields-model';
import { CostCenterFields, CreateCostCenterFields } from '@e2e/models/cost-center-fields-model';
import { EngagementFields } from '@e2e/models/engagement-fields-model';
import { SowFields } from '@e2e/models/sow-fields-model';

type EntitiesFieldTypes = ClientFields | EngagementFields | SowFields | CostCenterFields | CreateCostCenterFields;

export abstract class EntitiesBasePage {
  private readonly container: string = '.intems-form';
  private readonly listOptions: string = 'li.vs__dropdown-option:not([class~=vs__dropdown-option--selected])';
  private readonly submitButton: string = `button=${en.save.toLocaleUpperCase()}`;
  readonly fields: string = 'div[role="combobox"]';

  clickOnSubmitButton(): void {
    clickOnElement($(this.submitButton));
  }

  getValueFromField(field: EntitiesFieldTypes): string {
    const $fields = $$(this.fields);
    const $values = $fields[field].$('.vs__selected-options').$$('.vs__selected');

    return $values.map((value) => getText(value)).join('~');
  }

  isDisplayed(): boolean {
    return isDisplayed($(this.container));
  }

  isSubmitButtonDisplayed(): boolean {
    return isDisplayed($(this.submitButton));
  }

  setValueIntoField(field: EntitiesFieldTypes, value?: string): void {
    const $fields = $$(`${this.fields} div.vs__actions`);

    if (value) {
      clickOnElement($fields[field]);
      //Added for Parent Sow, because it has one item already
      browser.waitUntil(() => $$(this.listOptions).length > 1);

      return clickOnElement($(`li=${value}`));
    }

    clickOnElement($fields[field]);
    browser.waitUntil(() => $$(this.listOptions).length > 0);

    const valuesList = $$(this.listOptions);

    clickOnElement(valuesList[randomNumber(0, valuesList.length - 1)]);
    //Added to avoid click interceptions
    browser.waitUntil(() => $$(this.listOptions).length === 0);
  }
}
