import { isSuccessToastDisplayed } from '@e2e/helpers/common-helper';

import { SowFields } from '@e2e/models/sow-fields-model';

import { SowsPage, SowPage } from '@e2e/page-objects';

describe('Edit SOW', () => {
  const sowPage = new SowPage();
  const sowsPage = new SowsPage();
  let client: string;
  let contactDetails: string;
  let contactPerson: string;
  let involvedManagers: string;
  let owner: string;
  let sowId: string;
  let sowName: string;

  beforeAll(() => {
    sowsPage.navigate();
  });

  it('sows page should be displayed', () => {
    expect(sowsPage.isDisplayed()).toBe(true);
  });

  it('add sow button should be displayed', () => {
    expect(sowsPage.isAddSowButtonDisplayed()).toBe(true);
  });

  it('should create sow', () => {
    sowName = sowsPage.createSow();

    expect(sowsPage.isSowDisplayed(sowName)).toBe(true);
  });

  it('should set sow id', () => {
    sowsPage.clickOnSow(sowName);
    browser.waitUntil(() => sowPage.isDisplayed());
    browser.waitUntil(() => sowPage.getSowId().length > 0);

    sowId = sowPage.setSowId();

    expect(sowId).toBeTruthy();
  });

  it('should set sow name', () => {
    sowName = sowPage.setSowName();

    expect(sowName).toBeTruthy();
  });

  it('start date picker should be disabled', () => {
    expect(sowPage.isStartDatePickerEnabled()).toBe(false);
  });

  it('end date picker should be disabled', () => {
    expect(sowPage.isEndDatePickerEnabled()).toBe(false);
  });

  it('should set client', () => {
    sowPage.setValueIntoField(SowFields.Client);

    client = sowPage.getValueFromField(SowFields.Client);

    expect(client).toBeTruthy();
  });

  it('should set owner', () => {
    sowPage.setValueIntoField(SowFields.Owner);

    owner = sowPage.getValueFromField(SowFields.Owner);

    expect(owner).toBeTruthy();
  });

  it('should set contact person', () => {
    contactPerson = sowPage.setContactPerson();

    expect(contactPerson).toBeTruthy();
  });

  it('should set contact details', () => {
    contactDetails = sowPage.setContactDetails();

    expect(contactDetails).toBeTruthy();
  });

  it('should set involved managers', () => {
    sowPage.setValueIntoField(SowFields.InvolvedManagers);

    involvedManagers = sowPage.getValueFromField(SowFields.InvolvedManagers);

    expect(involvedManagers).toBeTruthy();
  });

  it('should check that changes are saved correctly', () => {
    sowPage.clickOnSubmitButton();
    browser.waitUntil(() => sowPage.isDisplayed() === false);
    browser.waitUntil(() => isSuccessToastDisplayed());
    browser.waitUntil(() => sowsPage.isDisplayed());

    sowsPage.clickOnSow(sowName);
    browser.waitUntil(() => sowPage.isDisplayed());
    browser.waitUntil(() => sowPage.getSowId().length > 0);

    expect(sowPage.getSowId()).toBe(sowId, 'Id');
    expect(sowPage.getSowName()).toBe(sowName, 'Name');
    expect(sowPage.getValueFromField(SowFields.Client)).toBe(client, 'Client');
    expect(sowPage.getValueFromField(SowFields.Owner)).toBe(owner, 'Owner');
    expect(sowPage.getContactPerson()).toBe(contactPerson, 'Contact person');
    expect(sowPage.getContactDetails()).toBe(contactDetails, 'Contact details');
    expect(sowPage.getValueFromField(SowFields.InvolvedManagers)).toBe(involvedManagers, 'Involved managers');
  });
});
