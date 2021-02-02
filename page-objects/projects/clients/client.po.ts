import { EntitiesBasePage } from '../entities-base.po';

export class ClientPage extends EntitiesBasePage {
  private readonly clientNameField: string = '#client_name';
  private readonly pipeDriveIdField: string = '#client_pipedrive';

  getClientName(): string {
    return $(this.clientNameField).getValue();
  }

  isClientNameFieldEnabled(): boolean {
    return $(this.clientNameField).isEnabled();
  }

  isPipeDriveFieldEnabled(): boolean {
    return $(this.pipeDriveIdField).isEnabled();
  }
}
