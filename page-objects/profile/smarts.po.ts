import { clickOnElement, getText } from '@e2e/helpers/common-helper';

import { en } from '@e2e/i18n/en';

import { ProfilePage } from './profile.po';

export class SmartsPage extends ProfilePage {
  private readonly balance: string = 'span.smarts-balance';
  private readonly giveKudosButton: string = `a=${en.giveKudos}`;

  constructor() {
    super('table.vm-main-table', '.items [href$="/smarts"]');
  }

  clickOnGiveKudosButton(): void {
    clickOnElement($(this.giveKudosButton));
  }

  getKudosBalance(): number {
    return Number(getText($$(this.balance)[1]));
  }

  getSmartsBalance(): number {
    return Number(getText($$(this.balance)[0]));
  }

  getLastStatisticsRecord(): string {
    const $statisticsRecords = $$('.row-kudos');
    const $lastRecord = $statisticsRecords[0];

    const outcome = getText($lastRecord.$('.outcome'));
    const category = getText($lastRecord.$$('td')[1]);
    const comment = getText($lastRecord.$('.comment'));

    return `${outcome}~${category}~${comment}`;
  }

  navigate(): void {
    super.navigate();

    clickOnElement($(this.page));
    browser.waitUntil(() => this.isDisplayed());
  }
}
