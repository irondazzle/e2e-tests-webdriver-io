import { ProfilePage } from './profile.po';

export class ManageMyProfilePage extends ProfilePage {
  constructor() {
    super('div#manage-my-profile', '.items [href$="/manage-my-profile"]');
  }
}
