const errorToast: string = 'div#toast-container div.error';
const successToast: string = 'div#toast-container div.success';

export function addDurations(firstDuration: string, secondDuration: string): string {
  const firstDurationHours = Number(firstDuration.split(':')[0]);
  const firstDurationMinutes = Number(firstDuration.split(':')[1]);
  const secondDurationHours = Number(secondDuration.split(':')[0]);
  const secondDurationMinutes = Number(secondDuration.split(':')[1]);

  let hours = firstDurationHours + secondDurationHours;
  let minutes = firstDurationMinutes + secondDurationMinutes;

  if (Math.floor(minutes / 60) > 0) {
    hours += Math.floor(minutes / 60);
    minutes = minutes % 60;
  }

  return minutes < 10 ? `${hours}:0${minutes}` : `${hours}:${minutes}`;
}

export function clickOnElement(element: WebdriverIO.Element, withoutScroll: boolean = false): void {
  browser.waitUntil(() => isDisplayed(element, withoutScroll));

  element.moveTo();
  element.click();
}

export function getErrorToastMessage(): string {
  return $(errorToast).$('div.message').getText();
}

export function getSuccessToastMessage(): string {
  return $(successToast).$('div.message').getText();
}

export function getText(element: WebdriverIO.Element): string {
  browser.waitUntil(() => isDisplayed(element));

  return element.getText();
}

export function isDisplayed(element: WebdriverIO.Element, withoutScroll: boolean = false): boolean {
  try {
    if (!element.isExisting()) {
      return false;
    }

    if (!withoutScroll) {
      element.scrollIntoView();
    }

    return element.isDisplayedInViewport();
  } catch(e) {
    return false;
  }
}

export function isErrorToastDisplayed(): boolean {
  return isDisplayed($(errorToast));
}

export function isSuccessToastDisplayed(): boolean {
  return isDisplayed($(successToast));
}

export function removeAttribute(element: Element): void {
  //NOTE: Needed for removal hidden parameters in upload files cases
  browser.execute((el, attribute) => el.removeAttribute(attribute), element);
}

export function setFocus(element: WebdriverIO.Element): void {
  browser.execute((el: HTMLElement) => el.focus(), element);
}

export function setStringTypeTime(hours: number, minutes: number): string {
  const minutesRemainder = minutes % 5;

  minutes = minutesRemainder <= 2 ? minutes - minutesRemainder : minutes + (5 - minutesRemainder);

  return minutes < 10 ? `${hours}:0${minutes}` : `${hours}:${minutes}`;
}
