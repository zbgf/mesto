export default class Card {
  constructor(data, handleCardClick, templateElement, userId, userData) {
    this._data = data;
    this._name = this._data.name;
    this._link = this._data.link;
    this._template = templateElement;
    this._elementList = document.querySelector(this._template).content.querySelector('.element__list').cloneNode(true);
    this._elementImage = this._elementList.querySelector('.element__image');
    this._elementTitle = this._elementList.querySelector('.element__title');
    this._elementLike = this._elementList.querySelector('.element__like');
    this._elementTrash = this._elementList.querySelector('.element__trash');
    this._elementLikeCount = this._elementList.querySelector('.element__likeCount');
    this._openImage = handleCardClick.handleCardOpenImage;
    this._cardDelete = handleCardClick.handleCardDelete;
    this._addLike = handleCardClick.handleCardAddLike;
    this._deliteLike = handleCardClick.handleCardDeleteLike;
    this._userId = userId;
    this._cardId = userData.cardId;
    this._authorId = userData.authorId;
  };

  deleteCard () {
    this._elementList.remove();
  };

  toggleLike (element) {
    this._like = element.likes;
    this._elementLikeCount.textContent = this._like.length;
    if (this._like.find((userLike) => userLike._id === this._userId)) {
      this._elementLike.classList.add('element__like_active');
    } else {
      this._elementLike.classList.remove('element__like_active');
    }
  };

  _setEventListeners () {
    if (this._userId === this._authorId) {
      this._elementTrash.addEventListener('click', () =>  this._cardDelete(this, this._cardId));
    } else {
      this._elementTrash.remove();
    }

    this._elementLike.addEventListener('click', () => this._likeElement())
    this._elementImage.addEventListener('click', () => this._openImage(this._name, this._link));
  };

  create () {
    this._elementTitle.textContent = this._name;
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._setEventListeners();
    this.toggleLike(this._data);

    return this._elementList;
  };

  _likeElement () {
    if (this._like.find((userLike) => userLike._id === this._userId)) {
      this._deliteLike(this._cardId);
    } else {
      this._addLike(this._cardId);
    }
  };
}