import { isSuccessToastDisplayed } from '@e2e/helpers/common-helper';

import { SowFields } from '@e2e/models/sow-fields-model';

import { CreateSowPage, SowDatePicker, SowsPage, SowPage } from '@e2e/page-objects';

describe('Create SOW', () => {
  const createSowPage = new CreateSowPage();
  const sowsPage = new SowsPage();
  const today = new Date().getDate();
  const todayFormatted = today < 10 ? `0${today}` : `${today}`;
  const tomorrowFormatted = (today + 1) < 10 ? `0${today + 1}` : `${today + 1}`;
  let client: string;
  let contactDetails: string;
  let contactPerson: string;
  let datePickersIds: string[];
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

  it('sow id field should be enabled', () => {
    sowsPage.clickOnAddSowButton();
    browser.waitUntil(() => createSowPage.isDisplayed());

    expect(createSowPage.isSowIdFieldEnabled()).toBe(true);
  });

  it('should set sow id', () => {
    sowId = createSowPage.setSowId();

    expect(sowId).toBeTruthy();
  });

  it('should set sow name', () => {
    sowName = createSowPage.setSowName();

    expect(sowName).toBeTruthy();
  });

  it('should set auto close date', () => {
    datePickersIds = createSowPage.getDatePickerIds();
    const autoCloseDatePicker = new SowDatePicker(datePickersIds[2]);

    createSowPage.clickOnAutoCloseDatePicker();
    browser.waitUntil(() => autoCloseDatePicker.isDisplayed());
    browser.waitUntil(() => autoCloseDatePicker.isTodayDisplayed());

    autoCloseDatePicker.setDay(today + 1);

    autoCloseDatePicker.clickOnSubmitButton();
    browser.waitUntil(() => autoCloseDatePicker.isDisplayed() === false);

    expect(createSowPage.getAutoCloseDatePickerDate()).toBe(tomorrowFormatted);
  });

  it('should set end date', () => {
    datePickersIds = createSowPage.getDatePickerIds();
    const endDatePicker = new SowDatePicker(datePickersIds[1]);

    createSowPage.clickOnEndDatePicker();
    browser.waitUntil(() => endDatePicker.isDisplayed());
    browser.waitUntil(() => endDatePicker.isTodayDisplayed());

    endDatePicker.setDay(today + 1);

    endDatePicker.clickOnSubmitButton();
    browser.waitUntil(() => endDatePicker.isDisplayed() === false);

    expect(createSowPage.getEndDatePickerDate()).toBe(tomorrowFormatted);
  });

  it('should set start date', () => {
    datePickersIds = createSowPage.getDatePickerIds();

    const startDatePicker = new SowDatePicker(datePickersIds[0]);

    createSowPage.clickOnStartDatePicker();
    browser.waitUntil(() => startDatePicker.isDisplayed());
    browser.waitUntil(() => startDatePicker.isTodayDisplayed());

    startDatePicker.setDay(today);

    startDatePicker.clickOnSubmitButton();
    browser.waitUntil(() => startDatePicker.isDisplayed() === false);

    expect(createSowPage.getStartDatePickerDate()).toBe(todayFormatted);
  });

  it('should set client', () => {
    createSowPage.setValueIntoField(SowFields.Client);

    client = createSowPage.getValueFromField(SowFields.Client);

    expect(client).toBeTruthy();
  });

  it('should set owner', () => {
    createSowPage.setValueIntoField(SowFields.Owner);

    owner = createSowPage.getValueFromField(SowFields.Owner);

    expect(owner).toBeTruthy();
  });

  it('should set contact person', () => {
    contactPerson = createSowPage.setContactPerson();

    expect(contactPerson).toBeTruthy();
  });

  it('should set contact details', () => {
    contactDetails = createSowPage.setContactDetails();

    expect(contactDetails).toBeTruthy();
  });

  it('should set involved managers', () => {
    createSowPage.setValueIntoField(SowFields.InvolvedManagers);

    involvedManagers = createSowPage.getValueFromField(SowFields.InvolvedManagers);

    expect(involvedManagers).toBeTruthy();
  });

  it('should check that sow is created correctly', () => {
    const sowPage = new SowPage();

    createSowPage.clickOnSubmitButton();
    browser.waitUntil(() => createSowPage.isDisplayed() === false);
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
