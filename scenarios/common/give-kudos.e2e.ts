import { logInAsUser } from '@e2e/helpers/authorization-helper';
import { Admin, User } from '@e2e/helpers/users-helper';

import { GiveKudosDialog, Menu, SmartsPage } from '@e2e/page-objects';

describe('Give kudos', () => {
  const giveKudosDialog = new GiveKudosDialog();
  const menu = new Menu();
  const smartsPage = new SmartsPage();
  let kudosQuantity: number;
  let smartsQuantity: number;

  it('should get smarts quantity for user', () => {
    smartsQuantity = menu.getSmartsQuantity();

    expect(smartsQuantity).toBeGreaterThanOrEqual(0);
  });

  it('menu should be displayed', () => {
    logInAsUser(Admin.id);

    expect(menu.isDisplayed()).toBe(true);
  });

  it('kudos quantity should be more than zero', () => {
    expect(menu.getKudosQuantity()).toBeGreaterThan(0);
  });

  it('give kudos modal window should be displayed', () => {
    menu.clickOnGiveKudosButton();
    browser.waitUntil(() => smartsPage.isDisplayed());

    expect(giveKudosDialog.isDisplayed()).toBe(true);
  });

  it('receiver field should be displayed', () => {
    expect(giveKudosDialog.isReceiverFieldDisplayed()).toBe(true);
  });

  it('category field should be displayed', () => {
    expect(giveKudosDialog.isCategoryFieldDisplayed()).toBe(true);
  });

  it('quantity field should be displayed', () => {
    expect(giveKudosDialog.isQuantityFieldDisplayed()).toBe(true);
  });

  it('comment field should be displayed', () => {
    expect(giveKudosDialog.isCommentFieldDisplayed()).toBe(true);
  });

  it('give kudos button should be displayed', () => {
    expect(giveKudosDialog.isGiveKudosButtonDisplayed()).toBe(true);
  });

  it('should check that not possible to submit dialog without mandatory fields', () => {
    giveKudosDialog.clickOnGiveKudosButton();
    browser.waitUntil(() => giveKudosDialog.isErrorMessageDisplayed());

    const errorMessage = giveKudosDialog.getErrorMessage();

    expect(errorMessage).toContain('Field "Receiver\'s full name" can not be empty');
    expect(errorMessage).toContain('Field "Describe what you are grateful for?" can not be empty');
    expect(errorMessage).toContain('Field "Kudos category" can not be empty');
  });

  it('should give kudos', () => {
    giveKudosDialog.setReceiver(User.fullName);
    const category = giveKudosDialog.setCategory();
    kudosQuantity = giveKudosDialog.setQuantity();
    const comment = giveKudosDialog.setComment();
    const recordHash = `-${kudosQuantity} kudos~${category}~You gave ${kudosQuantity} kudos to ${User.fullName}; Comment: ${comment}`;

    giveKudosDialog.clickOnGiveKudosButton();
    browser.waitUntil(() => giveKudosDialog.isDisplayed() === false);

    expect(smartsPage.getLastStatisticsRecord()).toBe(recordHash);
  });

  it('should check that kudos is converted to smarts', () => {
    logInAsUser(User.id);

    expect(menu.getSmartsQuantity()).toBe(smartsQuantity + kudosQuantity);
  });
});
