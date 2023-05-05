import {popupImage, popupImagePlace, popupImageImage, openPopup} from "./index.js";

export class Card {
  constructor(data, templateElement) {
    this._name = data.name;
    this._link = data.link;
    this._template = templateElement;
    this._elementList = document.querySelector(this._template).content.querySelector('.element__list').cloneNode(true);
    this._elementTitle = this._elementList.querySelector('.element__title');
    this._elementTrash = this._elementList.querySelector('.element__trash');
    this._elementLike = this._elementList.querySelector('.element__like');
    this._elementImage = this._elementList.querySelector('.element__image');
  };

  _deleteCard () {
    this._elementTrash.addEventListener('click', (evt) => evt.target.closest('.element__list').remove());
  };

  _likeCard () {
    this._elementLike.addEventListener('click', (evt) => evt.target.classList.toggle('element__like_active'));
  };

  _openPopupImage () {
    this._elementImage.addEventListener('click',  () => {
      openPopup(popupImage);
      popupImagePlace.textContent = this._name;
      popupImageImage.src = this._link;
      popupImageImage.alt = this._name;
    });
  };

  create () {
    this._elementTitle.textContent = this._name;
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._deleteCard();
    this._likeCard();
    this._openPopupImage();

    return this._elementList;
  };
}