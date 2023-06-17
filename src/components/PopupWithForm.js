import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitCallback) {
    super(popupSelector);
    this._formSubmitCallback = formSubmitCallback;
    this._popupForm = this._popupSelector.querySelector('.popup__form');
    this._popupInput = this._popupForm.querySelectorAll('.popup__input');
    this._popupButton = this._popupSelector.querySelector('.popup__button');
    this._popupButtonMainText = this._popupButton.textContent;
  };

  _getInputValues () {
    this._inputValues = {};
    this._popupInput.forEach(inputElement => {
      this._inputValues[inputElement.name] = inputElement.value;
    })
    return this._inputValues;
  };
  
  setEventListeners () {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', evt => {
      evt.preventDefault();
      this._formSubmitCallback(this._getInputValues());
      this.close();
    });
  };

  close () {
    super.close();
    this._popupForm.reset();
  };

  makeTextSave () {
    this._popupButton.textContent = 'Сохранение...';
  };

  returnMainText () {
    this._popupButton.textContent = this._popupButtonMainText;
  };
}