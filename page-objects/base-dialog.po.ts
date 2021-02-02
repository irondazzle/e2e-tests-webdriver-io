import { isDisplayed } from '@e2e/helpers/common-helper';

export abstract class BaseDialog {
  constructor(readonly container: string) {
    this.container = container;
  }

  isDisplayed(): boolean {
    return isDisplayed($(this.container), true);
  }
}
