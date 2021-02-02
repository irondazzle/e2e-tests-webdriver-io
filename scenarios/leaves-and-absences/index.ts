
import { logInAsUser } from '@e2e/helpers/authorization-helper';
import { Admin, User } from '@e2e/helpers/users-helper';

describe('Leaves and absences ', () => {
  describe('Admin role', () => {
    beforeAll(() => {
      browser.refresh();
      logInAsUser(Admin.id);
    });

    require('./create-vacation-request-in-advance.e2e');
    require('./remove-vacation-request-in-advance.e2e');
    require('./report-sick-leave-with-medical-note.e2e');
    require('./report-sick-leave-with-medical-note-from-doctor.e2e');
    require('./report-sick-leave-without-medical-note.e2e');
  });

  describe('User role', () => {
    beforeAll(() => {
      browser.refresh();
      logInAsUser(User.id);
    });

    require('./approve-sick-leave-without-medical-note.e2e');
  });
});
