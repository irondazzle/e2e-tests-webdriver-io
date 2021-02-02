import { logInAsUser } from '@e2e/helpers/authorization-helper';
import { Admin } from '@e2e/helpers/users-helper';

describe('Projects', () => {
  beforeAll(() => {
    browser.refresh();
    logInAsUser(Admin.id);
  });

  require('./edit-client.e2e');
  require('./edit-engagement.e2e');
  require('./create-sow.e2e');
  require('./edit-sow.e2e');
  require('./create-virtual-sow.e2e');
  require('./create-cost-center.e2e');
});
