
import { logInAsUser } from '@e2e/helpers/authorization-helper';
import { Admin} from '@e2e/helpers/users-helper';

describe('Time', () => {
  beforeAll(() => {
    browser.refresh();
    logInAsUser(Admin.id);
  });

  require('./add-period.e2e');
  require('./remove-period.e2e');
  require('./add-period-with-maximum-possible-duration.e2e');
  require('./add-period-for-yesterday.e2e');
  require('./edit-period.e2e');
  //require('./add-period-by-play-pause.e2e');
});
