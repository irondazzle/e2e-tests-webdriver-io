import { clickOnElement } from '@e2e/helpers/common-helper';
import { randomText } from '@e2e/helpers/random-helper';

import { BaseDialog } from '../base-dialog.po';

export class RejectOvertimeRequestDialog extends BaseDialog {
  private readonly rejectButton: string = '.btn-primary';

  constructor() {
    super('div.rejectRequestModal');
  }

  clickOnSubmitButton(): void {
    clickOnElement($(this.container).$(this.rejectButton));
  }

  isRejectButtonEnabled(): boolean {
    return $(this.container).$(this.rejectButton).isEnabled();
  }

  setReason(): string {
    const $reason = $(this.container).$('textarea');
    const text = randomText(10, 20);

    $reason.clearValue();
    $reason.setValue(text);

    return text;
  }
}
