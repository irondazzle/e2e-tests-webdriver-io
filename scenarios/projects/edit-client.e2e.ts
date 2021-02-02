import { isSuccessToastDisplayed } from '@e2e/helpers/common-helper';

import { ClientFields } from '@e2e/models/client-fields-model';

import { ClientsPage, ClientPage } from '@e2e/page-objects';

describe('Edit client', () => {
  const clientPage = new ClientPage();
  const clientsPage = new ClientsPage();
  let accountManager: string;
  let clientName: string;
  let levelOne: string;
  let owners: string;
  let segmentation: string;
  let watchers: string;

  beforeAll(() => {
    clientsPage.navigate();
  });

  it('clients page should be displayed', () => {
    expect(clientsPage.isDisplayed()).toBe(true);
  });

  it('client name field should be disabled', () => {
    clientsPage.clickOnRandomActiveClient();
    browser.waitUntil(() => clientPage.isDisplayed());

    clientName = clientPage.getClientName();

    expect(clientPage.isClientNameFieldEnabled()).toBe(false);
  });

  it('pipedrive id field should be disabled', () => {
    expect(clientPage.isPipeDriveFieldEnabled()).toBe(false);
  });

  it('should set owner', () => {
    clientPage.setValueIntoField(ClientFields.Owners);

    owners = clientPage.getValueFromField(ClientFields.Owners);

    expect(owners).toBeTruthy();
  });

  it('should set watcher', () => {
    clientPage.setValueIntoField(ClientFields.Watchers);

    watchers = clientPage.getValueFromField(ClientFields.Watchers);

    expect(watchers).toBeTruthy();
  });

  it('should set level one', () => {
    clientPage.setValueIntoField(ClientFields.LevelOne);

    levelOne = clientPage.getValueFromField(ClientFields.LevelOne);

    expect(levelOne).toBeTruthy();
  });

  it('should set account manager', () => {
    clientPage.setValueIntoField(ClientFields.AccountManager);

    accountManager = clientPage.getValueFromField(ClientFields.AccountManager);

    expect(accountManager).toBeTruthy();
  });

  it('should set segmentation', () => {
    clientPage.setValueIntoField(ClientFields.Segmentation);

    segmentation = clientPage.getValueFromField(ClientFields.Segmentation);

    expect(segmentation).toBeTruthy();
  });

  it('should check that changes are saved correctly', () => {
    clientPage.clickOnSubmitButton();
    browser.waitUntil(() => clientPage.isDisplayed() === false);
    browser.waitUntil(() => isSuccessToastDisplayed());
    browser.waitUntil(() => clientsPage.isDisplayed());

    clientsPage.clickOnClient(clientName);
    browser.waitUntil(() => clientPage.isDisplayed());
    browser.waitUntil(() => clientPage.getClientName().length > 0);

    expect(clientPage.getValueFromField(ClientFields.Owners)).toBe(owners, 'Owners');
    expect(clientPage.getValueFromField(ClientFields.Watchers)).toBe(watchers, 'Watchers');
    expect(clientPage.getValueFromField(ClientFields.LevelOne)).toBe(levelOne, 'Level one');
    expect(clientPage.getValueFromField(ClientFields.AccountManager)).toBe(accountManager, 'Account manager');
    expect(clientPage.getValueFromField(ClientFields.Segmentation)).toBe(segmentation, 'Segmentation');
  });
});
