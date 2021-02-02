import { isSuccessToastDisplayed } from '@e2e/helpers/common-helper';

import { EngagementFields } from '@e2e/models/engagement-fields-model';
import { months } from '@e2e/models/months-model';

import { EngagementsPage, EngagementPage, EngagementDatePicker } from '@e2e/page-objects';

describe('Edit engagement', () => {
  const engagementPage = new EngagementPage();
  const engagementsPage = new EngagementsPage();
  let deliveryManagers: string;
  let engagementModel: string;
  let engagementName: string;
  let organisationUnit: string;

  beforeAll(() => {
    engagementsPage.navigate();
  });

  it('engagements page should be displayed', () => {
    expect(engagementsPage.isDisplayed()).toBe(true);
  });

  it('client name field should be disabled', () => {
    engagementsPage.clickOnRandomActiveEngagement();
    browser.waitUntil(() => engagementPage.isDisplayed());
    browser.waitUntil(() => engagementPage.getClientName().length > 0);

    expect(engagementPage.isClientNameFieldEnabled()).toBe(false);
  });

  it('pipedrive deal name field should be disabled', () => {
    expect(engagementPage.isPipeDriveDealNameFieldEnabled()).toBe(false);
  });

  it('pipedrive id field should be disabled', () => {
    expect(engagementPage.isPipeDriveFieldEnabled()).toBe(false);
  });

  it('should set organisation unit', () => {
    engagementPage.setValueIntoField(EngagementFields.OrganisationUnit);

    organisationUnit = engagementPage.getValueFromField(EngagementFields.OrganisationUnit);

    expect(organisationUnit).toBeTruthy();
  });

  it('engagement name field should be displayed', () => {
    expect(engagementPage.isEngagementNameFieldDisplayed()).toBe(true);
  });

  it('should set engagement name', () => {
    engagementPage.setEngagementName();

    engagementName = engagementPage.getEngagementName();

    expect(engagementName).toBeTruthy();
  });

  it('should set delivery manager', () => {
    engagementPage.setValueIntoField(EngagementFields.DeliveryManagers);

    deliveryManagers = engagementPage.getValueFromField(EngagementFields.DeliveryManagers);

    expect(deliveryManagers).toBeTruthy();
  });

  it('should set start date', () => {
    const engagementDatePicker = new EngagementDatePicker(engagementPage.getDatePickerId());
    const today = new Date().toString().split(' ')[2];

    engagementPage.clickOnDatePicker();
    browser.waitUntil(() => engagementDatePicker.isDisplayed());

    engagementDatePicker.setMonth(months[new Date().getMonth()]);
    engagementDatePicker.setYear('2021');
    browser.waitUntil(() => engagementDatePicker.isTodayDisplayed());

    engagementDatePicker.setDay(new Date().getDate());

    engagementDatePicker.clickOnSubmitButton();
    browser.waitUntil(() => engagementDatePicker.isDisplayed() === false);

    expect(engagementPage.getDatePickerDate()).toBe(today);
  });

  it('should set engagement model', () => {
    engagementPage.setValueIntoField(EngagementFields.EngagementModel);

    engagementModel = engagementPage.getValueFromField(EngagementFields.EngagementModel);

    expect(engagementModel).toBeTruthy();
  });

  it('should check that changes are saved correctly', () => {
    engagementPage.clickOnSubmitButton();
    browser.waitUntil(() => engagementPage.isDisplayed() === false);
    browser.waitUntil(() => isSuccessToastDisplayed());
    browser.waitUntil(() => engagementsPage.isDisplayed());

    engagementsPage.clickOnEngagement(engagementName);
    browser.waitUntil(() => engagementPage.isDisplayed());
    browser.waitUntil(() => engagementPage.getEngagementName().length > 0);

    expect(engagementPage.getEngagementName()).toBe(engagementName, 'Engagement name');
    expect(engagementPage.getValueFromField(EngagementFields.OrganisationUnit)).toBe(organisationUnit, 'Org unit');
    expect(engagementPage.getValueFromField(EngagementFields.DeliveryManagers)).toBe(deliveryManagers, 'Delivery managers');
    expect(engagementPage.getValueFromField(EngagementFields.EngagementModel)).toBe(engagementModel, 'Engagement model');
  });
});
