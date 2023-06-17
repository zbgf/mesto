import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {

  constructor(popupSelector, {callbackConfirmationDelete}) {
    super(popupSelector);
    this._submitButton = this._popupSelector.querySelector('.popup__form');
    this._callbackConfirmationDelete = callbackConfirmationDelete;
  };

  open(cardObject, cardId) {
    super.open();
    this._cardObject = cardObject;
    this._cardId = cardId;
  };

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener('submit', (evt) => { 
      evt.preventDefault(); 
      this._callbackConfirmationDelete(this._cardObject, this._cardId) })
  };
}
