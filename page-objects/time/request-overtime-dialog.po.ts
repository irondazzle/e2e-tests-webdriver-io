import { clickOnElement } from '@e2e/helpers/common-helper';
import { randomText } from '@e2e/helpers/random-helper';

import { BaseDialog } from '../base-dialog.po';

export class RequestOvertimeDialog extends BaseDialog {
  private readonly submitButton: string = '.btn-primary';

  constructor() {
    super('div#requireOvertime');
  }

  clickOnSubmitButton(): void {
    clickOnElement($(this.container).$(this.submitButton));
  }

  isSubmitButtonEnabled(): boolean {
    return $(this.container).$(this.submitButton).isEnabled();
  }

  setReason(): string {
    const $reason = $(this.container).$('textarea');
    const text = randomText(10, 20);

    $reason.clearValue();
    $reason.setValue(text);

    return text;
  }
}
