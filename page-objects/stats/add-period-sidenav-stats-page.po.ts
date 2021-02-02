import { clickOnElement, getText, isDisplayed } from '@e2e/helpers/common-helper';
import { randomNumber } from '@e2e/helpers/random-helper';

import { AddPeriodSidenav } from '../add-period-sidenav.po';

export class AddPeriodSidenavStatsPage extends AddPeriodSidenav {
  private readonly datePicker = 'div.date-container';
  private readonly todayDay = 'span.today';

  constructor() {
    super('div.sidenav', 'div.button-row .btn', 'textarea[name="description"]');
  }

  clickOnCloseButton(): void {
    clickOnElement($(this.container).$('button.sidenav-close'));
  }

  isDatePickerDisplayed(): boolean {
    return isDisplayed($(this.datePicker), true);
  }

  isTodayDaySelected(): boolean {
    return ($(this.datePicker).$(this.todayDay).getAttribute('class')).includes('selected');
  }

  setTasks(): string {
    const limitedReportingProjects: string[] = ['Finance', 'Workforce Mgmt'];
    let projectName: string;
    let tasksCount: number = $('div.tasks-dropdowns').$$('div.select-row').length;

    for (let i = 0; i <= tasksCount; i++) {
      const $task = $('div.tasks-dropdowns').$$('div.select-row')[i];
      const oldTasksCount = tasksCount;

      clickOnElement($task);

      const $taskValues = $task.$$('li').filter($task => !limitedReportingProjects.includes(getText($task)));
      const $taskValue = $taskValues[randomNumber(0, $taskValues.length - 1)];

      if (!i) {
        projectName = getText($taskValue);
      }

      clickOnElement($taskValue);

      tasksCount = $('div.tasks-dropdowns').$$('div.select-row').length;

      if (oldTasksCount === tasksCount) {
        break;
      }
    }

    return projectName;
  }

  setTodayDate(): void {
    clickOnElement($(this.datePicker).$(this.todayDay));
  }
}
