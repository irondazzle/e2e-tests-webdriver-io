import { clickOnElement } from '@e2e/helpers/common-helper';

import { BaseDialog } from '../base-dialog.po';

export class TrackedTimeDialog extends BaseDialog {
  constructor() {
    super('div#modalTracked');
  }

  clickOnAddNowButton(): void {
    clickOnElement($(this.container).$('.btn-primary'));
  }
}
