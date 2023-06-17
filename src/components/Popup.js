export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
  };

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  setEventListeners () {
    this._popupSelector.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup')||evt.target.classList.contains('popup__close')) {
        this.close();
      }
    });
  };

  open () {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keyup', this._handleEscClose)
  };

  close () {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._handleEscClose);
  };
}