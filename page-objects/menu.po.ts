import { clickOnElement, getText, isDisplayed } from '@e2e/helpers/common-helper';

export class Menu {
  private readonly container: string = '#menu';
  private readonly giveKudosButton: string = '.kudos-href';
  private readonly kudosQuantity: string = '.kudos + span';
  private readonly smartQuantity: string = '.smart + span';

  clickOnGiveKudosButton(): void {
    clickOnElement($(this.giveKudosButton));
  }

  getKudosQuantity(): number {
    return Number(getText($(this.kudosQuantity)));
  }

  getSmartsQuantity(): number {
    return Number(getText($(this.smartQuantity)));
  }

  isDisplayed(): boolean {
    return isDisplayed($(this.container));
  }

  openProfile(): void {
    clickOnElement($('#avatar_dropdown_btn'));
    browser.waitUntil(() => isDisplayed($('#avatar_dropdown')));

    clickOnElement($('[href$="/manage-my-profile"]'));
    browser.waitUntil(() => isDisplayed($('div#manage-my-profile')));
  }
}
