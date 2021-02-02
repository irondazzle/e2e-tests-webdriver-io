import { logInAsUser } from '@e2e/helpers/authorization-helper';
import { Admin } from '@e2e/helpers/users-helper';

describe('Stats', () => {
  beforeAll(() => {
    browser.refresh();
    logInAsUser(Admin.id);
  });

  require('./get-periods-for-yesterday.e2e');
  require('./add-period-for-today.e2e');
  require('./remove-period-for-today.e2e');
  require('./edit-period-for-today.e2e');
});
