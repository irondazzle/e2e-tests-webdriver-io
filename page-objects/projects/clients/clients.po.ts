import { clickOnElement } from '@e2e/helpers/common-helper';
import { randomNumber } from '@e2e/helpers/random-helper';

import { en } from '@e2e/i18n/en';

import { ProjectsPage } from '../projects.po';

export class ClientsPage extends ProjectsPage {
  constructor() {
    super('.clickable', '[href$="/clients"]');
  }

  clickOnRandomActiveClient(): void {
    const $clients = $$(`td=${en.active}`);

    return clickOnElement($clients[randomNumber(0, $clients.length - 1)]);
  }

  clickOnClient(name: string): void {
    return clickOnElement($(`td=${name}`));
  }
}
