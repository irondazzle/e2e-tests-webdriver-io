import { logInAsUser } from '@e2e/helpers/authorization-helper';
import { User } from '@e2e/helpers/users-helper';

describe('Common tests', () => {
  describe('Common', () => {
    beforeAll(() => {
      browser.refresh();
      logInAsUser(User.id);
    });

    require('./give-kudos.e2e');
    require('./lite-links-check.e2e');
  });

  describe('Overtime requests', () => {
    beforeAll(() => {
      browser.refresh();
      logInAsUser(User.id);
    });

    require('./request-overtime.e2e');
  });
});
