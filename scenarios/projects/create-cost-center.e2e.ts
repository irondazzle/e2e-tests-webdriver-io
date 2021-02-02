import { isSuccessToastDisplayed } from '@e2e/helpers/common-helper';

import { CostCenterFields, CreateCostCenterFields } from '@e2e/models/cost-center-fields-model';

import { CreateCostCenterPage, CostCenterPage, CostCentersPage } from '@e2e/page-objects';

describe('Create Cost Center', () => {
  const costCentersPage = new CostCentersPage();
  const createCostCenterPage = new CreateCostCenterPage();
  let approval: string;
  let category: string;
  let costCenterName: string;
  let individualMembers: string;
  let organisationUnit: string;
  let ouMembers: string;
  let owner: string;
  let sows: string;

  beforeAll(() => {
    costCentersPage.navigate();
  });

  it('cost centers page should be displayed', () => {
    expect(costCentersPage.isDisplayed()).toBe(true);
  });

  it('add cost center button should be displayed', () => {
    expect(costCentersPage.isAddCostCenterButtonDisplayed()).toBe(true);
  });

  it('cost center name field should be displayed', () => {
    costCentersPage.clickOnAddCostCenterButton();
    browser.waitUntil(() => createCostCenterPage.isDisplayed());

    expect(createCostCenterPage.isCostCenterNameFieldDisplayed()).toBe(true);
  });

  it('should set cost center name', () => {
    createCostCenterPage.setCostCenterName();

    costCenterName = createCostCenterPage.getCostCenterName();

    expect(costCenterName).toBeTruthy();
  });

  it('should set an owner', () => {
    createCostCenterPage.setValueIntoField(CreateCostCenterFields.Owner);

    owner = createCostCenterPage.getValueFromField(CreateCostCenterFields.Owner);

    expect(owner).toBeTruthy();
  });

  it('should set organizational unit', () => {
    createCostCenterPage.setValueIntoField(CreateCostCenterFields.OrganisationUnit);

    organisationUnit = createCostCenterPage.getValueFromField(CreateCostCenterFields.OrganisationUnit);

    expect(organisationUnit).toBeTruthy();
  });

  it('should set category', () => {
    createCostCenterPage.setValueIntoField(CreateCostCenterFields.Category);

    category = createCostCenterPage.getValueFromField(CreateCostCenterFields.Category);

    expect(category).toBeTruthy();
  });

  it('should set approval', () => {
    createCostCenterPage.setValueIntoField(CreateCostCenterFields.Approval);

    approval = createCostCenterPage.getValueFromField(CreateCostCenterFields.Approval);

    expect(approval).toBeTruthy();
  });

  it('should set sows', () => {
    createCostCenterPage.setValueIntoField(CreateCostCenterFields.SOWs);

    sows = createCostCenterPage.getValueFromField(CreateCostCenterFields.SOWs);

    expect(sows).toBeTruthy();
  });

  it('should set individual members', () => {
    createCostCenterPage.setValueIntoField(CreateCostCenterFields.IndividualMembers);

    individualMembers = createCostCenterPage.getValueFromField(CreateCostCenterFields.IndividualMembers);

    expect(individualMembers).toBeTruthy();
  });

  it('should set OU members', () => {
    createCostCenterPage.setValueIntoField(CreateCostCenterFields.OUMembers);

    ouMembers = createCostCenterPage.getValueFromField(CreateCostCenterFields.OUMembers);

    expect(ouMembers).toBeTruthy();
  });

  it('should check that cost center is created correctly', () => {
    const costCenterPage = new CostCenterPage();

    createCostCenterPage.clickOnSubmitButton();
    browser.waitUntil(() => createCostCenterPage.isDisplayed() === false);
    browser.waitUntil(() => isSuccessToastDisplayed());
    browser.waitUntil(() => costCentersPage.isDisplayed());

    costCentersPage.clickOnCostCenter(costCenterName);
    browser.waitUntil(() => costCenterPage.isDisplayed());
    browser.waitUntil(() => costCenterPage.getCostCenterName().length > 0);

    expect(costCenterPage.getCostCenterName()).toBe(costCenterName, 'Name');
    expect(costCenterPage.getValueFromField(CostCenterFields.Owner)).toBe(owner, 'Owner');
    expect(costCenterPage.getValueFromField(CostCenterFields.OrganisationUnit)).toBe(organisationUnit, 'Org Unit');
    expect(costCenterPage.getValueFromField(CostCenterFields.Category)).toBe(category, 'Category');
    expect(costCenterPage.getValueFromField(CostCenterFields.Approval)).toBe(approval, 'Approval');
    expect(costCenterPage.getValueFromField(CostCenterFields.SOWs)).toBe(sows, 'SOWs');
    expect(costCenterPage.getValueFromField(CostCenterFields.IndividualMembers)).toBe(individualMembers, 'Individual Members');
    expect(costCenterPage.getValueFromField(CostCenterFields.OUMembers)).toBe(ouMembers, 'OU Members');
  });
});
