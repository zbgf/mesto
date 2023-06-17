import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImagePlace = document.querySelector('.popupImage__place');
    this._popupImageImage = document.querySelector('.popupImage__image');
  };

  open (description, image) {
    super.open();
    this._popupImagePlace.textContent = description;
    this._popupImageImage.src = image;
    this._popupImagePlace.alt = description;
  };
}