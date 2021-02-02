import { clickOnElement, isDisplayed, isSuccessToastDisplayed } from '@e2e/helpers/common-helper';
import { randomNumber } from '@e2e/helpers/random-helper';

import { en } from '@e2e/i18n/en';

import { SowFields } from '@e2e/models/sow-fields-model';

import { CreateSowPage } from './create-sow.po';
import { ProjectsPage } from '../projects.po';
import { SowDatePicker } from './sow-date-picker.po';

export class SowsPage extends ProjectsPage {
  private readonly addSowButton: string = `button=${en.addSow.toLocaleUpperCase()}`;

  constructor() {
    super('.clickable', '[href$="/sows"]');
  }

  clickOnAddSowButton(): void {
    return clickOnElement($(this.addSowButton));
  }

  clickOnRandomActiveSow(): void {
    const $sows = $$(`td=${en.active}`);

    return clickOnElement($sows[randomNumber(0, $sows.length - 1)]);
  }

  clickOnSow(name: string): void {
    return clickOnElement($(`td=${name}`));
  }

  createSow(): string {
    const createSowPage = new CreateSowPage();
    const oldSowsCount = this.getSowsCount();
    const today = new Date().getDate();

    this.clickOnAddSowButton();
    browser.waitUntil(() => createSowPage.isDisplayed());

    createSowPage.setSowId();
    const sowName = createSowPage.setSowName();

    const [startDatePickerId, endDatePickerId, autoCloseDatePickerId] = createSowPage.getDatePickerIds();
    const autoCloseDatePicker = new SowDatePicker(autoCloseDatePickerId);
    const endDatePicker = new SowDatePicker(endDatePickerId);
    const startDatePicker = new SowDatePicker(startDatePickerId);

    createSowPage.clickOnAutoCloseDatePicker();
    browser.waitUntil(() => autoCloseDatePicker.isDisplayed());
    browser.waitUntil(() => autoCloseDatePicker.isTodayDisplayed());
    autoCloseDatePicker.setDay(today + 1);
    autoCloseDatePicker.clickOnSubmitButton();
    browser.waitUntil(() => autoCloseDatePicker.isDisplayed() === false);

    createSowPage.clickOnEndDatePicker();
    browser.waitUntil(() => endDatePicker.isDisplayed());
    browser.waitUntil(() => endDatePicker.isTodayDisplayed());
    endDatePicker.setDay(today + 1);
    endDatePicker.clickOnSubmitButton();
    browser.waitUntil(() => endDatePicker.isDisplayed() === false);

    createSowPage.clickOnStartDatePicker();
    browser.waitUntil(() => startDatePicker.isDisplayed());
    browser.waitUntil(() => startDatePicker.isTodayDisplayed());
    startDatePicker.setDay(today);
    startDatePicker.clickOnSubmitButton();
    browser.waitUntil(() => startDatePicker.isDisplayed() === false);

    createSowPage.setValueIntoField(SowFields.Client);
    createSowPage.setValueIntoField(SowFields.Owner);
    createSowPage.setContactPerson();
    createSowPage.setContactDetails();
    createSowPage.setValueIntoField(SowFields.InvolvedManagers);

    createSowPage.clickOnSubmitButton();
    browser.waitUntil(() => createSowPage.isDisplayed() === false);
    browser.waitUntil(() => isSuccessToastDisplayed());
    browser.waitUntil(() => this.isDisplayed());
    browser.waitUntil(() => this.getSowsCount() > oldSowsCount);

    return sowName;
  }

  private getSowsCount(): number {
    return $$('.sow-table-row').length;
  }

  isAddSowButtonDisplayed(): boolean {
    return isDisplayed($(this.addSowButton));
  }

  isSowDisplayed(name: string): boolean {
    return isDisplayed($(`td=${name}`));
  }
}
