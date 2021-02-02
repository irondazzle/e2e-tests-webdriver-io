import { clickOnElement, isDisplayed } from '@e2e/helpers/common-helper';
import { randomText } from '@e2e/helpers/random-helper';

import { en } from '@e2e/i18n/en';

import { BaseDialog } from '../base-dialog.po';

export class RejectSickLeaveDialog extends BaseDialog {
  private readonly reasonContainer: string = 'div.modal-content textarea';
  private readonly submitButton: string = `a=${en.reject.toUpperCase()}`;

  constructor() {
    super(`span=${en.sickLeaveRejectReason}`);
  }

  clickOnSubmitButton(): void {
    clickOnElement($(this.submitButton));
  }

  getReason(): string {
    return $(this.reasonContainer).getAttribute('value');
  }

  isSubmitButtonDisplayed(): boolean {
    return isDisplayed($(this.submitButton));
  }

  setReason(): string {
    const $reason = $(this.reasonContainer);
    const text = randomText(10, 20);

    $reason.clearValue();
    $reason.setValue(text);

    return text;
  }
}
