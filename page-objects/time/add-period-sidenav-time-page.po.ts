import { clickOnElement, getText } from '@e2e/helpers/common-helper';
import { randomNumber } from '@e2e/helpers/random-helper';

import { en } from '@e2e/i18n/en';

import { AddPeriodSidenav } from '../add-period-sidenav.po';

export class AddPeriodSidenavTimePage extends AddPeriodSidenav {
  constructor() {
    super('div.sidenav', 'button.submit', 'textarea#description');
  }

  clickOnDropDownTab(): void {
    clickOnElement($(this.container).$(`button=${en.dropdown}`));
  }

  clickOnCloseButton(): void {
    clickOnElement($(this.container).$('button.sidenav-close'));
  }

  clickOnLatestProjectsTab(): void {
    clickOnElement($(this.container).$(`button=${en.latest}`));
  }

  private getLatestProjectName($project: WebdriverIO.Element): string {
    return getText($project.$('.path-node-project'));
  }

  setLatestProject(): string {
    const $projects = $(this.container).$$('div.pattern');
    const $project = $projects[randomNumber(0, $projects.length - 1)];

    clickOnElement($project);

    return this.getLatestProjectName($project);
  }

  setTasks(): string {
    const limitedReportingProjects: string[] = ['Finance', 'Workforce Mgmt'];
    let projectName: string;
    let tasksCount: number = $('div#dropdown-tab').$$('div.row').length;

    for (let i = 0; i <= tasksCount; i++) {
      const $task = $('div#dropdown-tab').$$('div.row')[i];
      const oldTasksCount = tasksCount;

      clickOnElement($task);

      const $taskValues = $task.$$('li:not([class~="selected"])').filter($task => !limitedReportingProjects.includes(getText($task)));
      const $taskValue = $taskValues[randomNumber(0, $taskValues.length - 1)];

      if (!i) {
        projectName = getText($taskValue);
      }

      clickOnElement($taskValue);

      tasksCount = $('div#dropdown-tab').$$('div.row').length;

      if (oldTasksCount === tasksCount) {
        break;
      }
    }

    return projectName;
  }
}
