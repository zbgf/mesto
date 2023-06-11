export default class Card {
  constructor( {data, handleCardClick}, templateElement) {
    this._name = data.name;
    this._link = data.link;
    this._template = templateElement;
    this._elementList = document.querySelector(this._template).content.querySelector('.element__list').cloneNode(true);
    this._elementTitle = this._elementList.querySelector('.element__title');
    this._elementTrash = this._elementList.querySelector('.element__trash');
    this._elementLike = this._elementList.querySelector('.element__like');
    this._elementImage = this._elementList.querySelector('.element__image');
    this._handleCardClick = handleCardClick;
  };

  _deleteCard () {
    this._elementList.remove();
  };

  _toggleLike (evt) {
    evt.target.classList.toggle('element__like_active');
  };

  _setEventListeners () {
    this._elementTrash.addEventListener('click', (evt) => this._deleteCard(evt));
    this._elementLike.addEventListener('click', (evt) => this._toggleLike(evt));
    this._elementImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
  };

  create () {
    this._elementTitle.textContent = this._name;
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._setEventListeners ();

    return this._elementList;
  };
}
