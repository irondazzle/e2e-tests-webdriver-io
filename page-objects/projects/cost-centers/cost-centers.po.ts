import { clickOnElement, isDisplayed } from '@e2e/helpers/common-helper';

import { en } from '@e2e/i18n/en';

import { ProjectsPage } from '../projects.po';

export class CostCentersPage extends ProjectsPage {
  private readonly addCostCenterButton: string = `button=${en.addCostCenter}`;

  constructor() {
    super('.clickable', '[href$="/cost-centers"]');
  }

  clickOnAddCostCenterButton(): void {
    return clickOnElement($(this.addCostCenterButton));
  }

  clickOnCostCenter(name: string): void {
    return clickOnElement($(`td=${name}`));
  }

  isAddCostCenterButtonDisplayed(): boolean {
    return isDisplayed($(this.addCostCenterButton));
  }
}
