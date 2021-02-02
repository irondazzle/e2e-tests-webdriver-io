import { isSuccessToastDisplayed } from '@e2e/helpers/common-helper';

import { SowFields } from '@e2e/models/sow-fields-model';

import { CreateSowPage, SowDatePicker, SowsPage, SowPage } from '@e2e/page-objects';

describe('Create virtual SOW', () => {
  const createSowPage = new CreateSowPage();
  const sowPage = new SowPage();
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
  let parentSow: string;
  let parentSowName: string;
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

  it('should create parent sow', () => {
    parentSowName = sowsPage.createSow();

    expect(sowsPage.isSowDisplayed(parentSowName)).toBe(true);
  });

  it('should set parent sow', () => {
    sowsPage.clickOnAddSowButton();
    browser.waitUntil(() => createSowPage.isDisplayed());

    createSowPage.setValueIntoField(SowFields.ParentSow, parentSowName);
    parentSow = createSowPage.getValueFromField(SowFields.ParentSow);

    browser.waitUntil(() => createSowPage.getSowId().length > 0);

    expect(parentSow).toBeTruthy();
  });

  it('sow id field should be disabled', () => {
    expect(createSowPage.isSowIdFieldEnabled()).toBe(false);
  });

  it('should get sow id', () => {
    sowId = createSowPage.getSowId();

    expect(sowId).toBeTruthy();
  });

  it('should set virtual sow name', () => {
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

  it('client field should be disabled', () => {
    expect(createSowPage.isClientFieldEnabled()).toBe(false);
  });

  it('should get client', () => {
    client = sowPage.getValueFromField(SowFields.Client);

    expect(client).toBeTruthy();
  });

  it('should get owner', () => {
    owner = sowPage.getValueFromField(SowFields.Owner);

    expect(owner).toBeTruthy();
  });

  it('owner field should be disabled', () => {
    expect(createSowPage.isOwnerFieldEnabled()).toBe(false);
  });

  it('contact person field should be disabled', () => {
    expect(createSowPage.isContactPersonFieldEnabled()).toBe(false);
  });

  it('should get contact person', () => {
    contactPerson = sowPage.getContactPerson();

    expect(contactPerson).toBeTruthy();
  });

  it('contact details field should be disabled', () => {
    expect(createSowPage.isContactDetailsFieldEnabled()).toBe(false);
  });

  it('should get contact details', () => {
    contactDetails = sowPage.getContactDetails();

    expect(contactDetails).toBeTruthy();
  });

  it('should set involved managers', () => {
    sowPage.setValueIntoField(SowFields.InvolvedManagers);

    involvedManagers = sowPage.getValueFromField(SowFields.InvolvedManagers);

    expect(involvedManagers).toBeTruthy();
  });

  it('should check that virtual sow is created correctly', () => {
    sowPage.clickOnSubmitButton();
    browser.waitUntil(() => sowPage.isDisplayed() === false);
    browser.waitUntil(() => isSuccessToastDisplayed());
    browser.waitUntil(() => sowsPage.isDisplayed());

    sowsPage.clickOnSow(sowName);
    browser.waitUntil(() => sowPage.isDisplayed());
    browser.waitUntil(() => sowPage.getSowId().length > 0);

    expect(sowPage.getValueFromField(SowFields.ParentSow)).toBe(parentSow, 'ParentSow');
    expect(sowPage.getSowId()).toBe(sowId, 'Id');
    expect(sowPage.getSowName()).toBe(sowName, 'Name');
    expect(sowPage.getValueFromField(SowFields.Client)).toBe(client, 'Client');
    expect(sowPage.getValueFromField(SowFields.Owner)).toBe(owner, 'Owner');
    expect(sowPage.getContactPerson()).toBe(contactPerson, 'Contact person');
    expect(sowPage.getContactDetails()).toBe(contactDetails, 'Contact details');
    expect(sowPage.getValueFromField(SowFields.InvolvedManagers)).toBe(involvedManagers, 'Involved managers');
  });
});
