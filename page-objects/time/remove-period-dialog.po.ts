import { clickOnElement, setFocus } from '@e2e/helpers/common-helper';

import { en } from '@e2e/i18n/en';

import { BaseDialog } from '../base-dialog.po';

export class RemovePeriodDialog extends BaseDialog {
  constructor() {
    super('div#confirmRemoving');
  }

  clickOnSubmitButton(): void {
    const submitButton = $(this.container).$(`button=${en.yes}`);

    submitButton.moveTo();

    setFocus(submitButton);
    browser.waitUntil(() => submitButton.isFocused());

    clickOnElement(submitButton);
  }
}
