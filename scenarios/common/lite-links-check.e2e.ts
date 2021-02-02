import { logInAsUser } from '@e2e/helpers/authorization-helper';
import { LiteLinkChecker } from '@e2e/helpers/lite-link-checker';
import { Admin, HereAdmin, Newcomer } from '@e2e/helpers/users-helper';

describe('Lite links check', () => {
  const liteLinkChecker = new LiteLinkChecker();

  beforeAll(() => {
    logInAsUser(Admin.id);
  })

  it('error 404 on "Move Efforts" page should not be displayed', () => {
    liteLinkChecker.navigateToMoveEffortsPage();

    expect(liteLinkChecker.isErrorPageDisplayed()).toBe(false);
  });

  it('error 404 on "Network map" page should not be displayed', () => {
    liteLinkChecker.navigateToNetworkMapPage();

    expect(liteLinkChecker.isErrorPageDisplayed()).toBe(false);
  });

  it('error 404 on "Release Notes" page should not be displayed', () => {
    liteLinkChecker.navigateToReleaseNotesPage();

    expect(liteLinkChecker.isErrorPageDisplayed()).toBe(false);
  });

  it('error 404 on "Requests sick leaves" page should not be displayed', () => {
    liteLinkChecker.navigateToRequestsSickLeavesPage();

    expect(liteLinkChecker.isErrorPageDisplayed()).toBe(false);
  });

  it('error 404 on "Requests vacations" page should not be displayed', () => {
    liteLinkChecker.navigateToRequestsVacationsPage();

    expect(liteLinkChecker.isErrorPageDisplayed()).toBe(false);
  });

  it('error 404 on "Rotation portal" page should not be displayed', () => {
    liteLinkChecker.navigateToRotationPortalPage();

    expect(liteLinkChecker.isErrorPageDisplayed()).toBe(false);
  });

  it('error 404 on "Stats" page should not be displayed', () => {
    liteLinkChecker.navigateToStatsPage();

    expect(liteLinkChecker.isErrorPageDisplayed()).toBe(false);
  });

  it('error 404 on "Time" page should not be displayed', () => {
    liteLinkChecker.navigateToTimePage();

    expect(liteLinkChecker.isErrorPageDisplayed()).toBe(false);
  });

  it('error 404 on "Welcome program" page should not be displayed', () => {
    logInAsUser(Newcomer.id);
    liteLinkChecker.navigateToWelcomeProgamPage();

    expect(liteLinkChecker.isErrorPageDisplayed()).toBe(false);
  });
});
