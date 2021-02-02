import { clickOnElement, getText, isDisplayed } from '@e2e/helpers/common-helper';
import { randomNumber, randomText } from '@e2e/helpers/random-helper';

import { en } from '@e2e/i18n/en';

import { BaseDialog } from '../base-dialog.po';

export class GiveKudosDialog extends BaseDialog {
  private readonly categoryField = '#type_of_transaction';
  private readonly commentField = '#comment';
  private readonly errorMessage: string = 'div.errorcontainer';
  private readonly giveKudosButton: string = `button=${en.giveKudos}`;
  private readonly quantityField: string = '#kudos_quantity';
  private readonly receiverField: string = '#select2-empl_id-container';

  constructor() {
    super('.modal-content');
  }

  clickOnGiveKudosButton(): void {
    clickOnElement($(this.giveKudosButton));
  }

  getErrorMessage(): string {
    return getText($(this.errorMessage));
  }

  getKudosQuantity(): number {
    return Number($(this.quantityField).getValue());
  }

  getReceiver(): string {
    return getText($(this.receiverField));
  }

  isCategoryFieldDisplayed(): boolean {
    return isDisplayed($(this.categoryField));
  }

  isCommentFieldDisplayed(): boolean {
    return isDisplayed($(this.commentField));
  }

  isErrorMessageDisplayed(): boolean {
    return isDisplayed($(this.errorMessage));
  }

  isGiveKudosButtonDisplayed(): boolean {
    return isDisplayed($(this.giveKudosButton));
  }

  isReceiverFieldDisplayed(): boolean {
    return isDisplayed($(this.receiverField));
  }

  isQuantityFieldDisplayed(): boolean {
    return isDisplayed($(this.quantityField));
  }

  setCategory(): string {
    const categories = ['Expert advice', 'Extra mile', 'Fantastic achievement', 'Inspirational leader', 'Great teamwork'];
    const category = categories[randomNumber(0, categories.length - 1)];

    $(this.categoryField).selectByVisibleText(category);

    return category;
  }

  setComment(): string {
    const comment = randomText(1, 5);

    $(this.commentField).clearValue();
    $(this.commentField).setValue(comment);

    return comment;
  }

  setQuantity(): number {
    const quantity = randomNumber(1,5);

    $(this.quantityField).clearValue();
    $(this.quantityField).setValue(quantity);

    return quantity;
  }

  setReceiver(name: string): void {
    clickOnElement($(this.receiverField));
    $('.select2-container input').setValue(name);
    clickOnElement($('.select2-container li'));
  }
}
