import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImagePlace = document.querySelector('.popupImage__place');
    this._popupImageImage = document.querySelector('.popupImage__image');
  };

  open (data) {
    super.open();
    this._popupImagePlace.textContent = data.name;
    this._popupImageImage.src = data.link;
    this._popupImageImage.alt = data.name;
  };
}