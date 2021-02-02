import { clickOnElement } from '@e2e/helpers/common-helper';
import { randomNumber } from '@e2e/helpers/random-helper';

import { en } from '@e2e/i18n/en';

import { ProjectsPage } from '../projects.po';

export class EngagementsPage extends ProjectsPage {
  constructor() {
    super('.clickable', '[href$="/engagements"]');
  }

  clickOnRandomActiveEngagement(): void {
    const $engagements = $$(`td=${en.active}`);

    return clickOnElement($engagements[randomNumber(0, $engagements.length - 1)]);
  }

  clickOnEngagement(name: string): void {
    return clickOnElement($(`td=${name}`));
  }
}
