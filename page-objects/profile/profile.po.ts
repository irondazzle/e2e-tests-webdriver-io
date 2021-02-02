import { isDisplayed } from '@e2e/helpers/common-helper';

import { Menu } from '../menu.po';

export abstract class ProfilePage {
  constructor(readonly container: string, readonly page: string) {
    this.container = container;
    this.page = page;
  }

  isDisplayed(): boolean {
    return isDisplayed($(this.container));
  }

  navigate(): void {
    const menu = new Menu();

    menu.openProfile();
  }
}
