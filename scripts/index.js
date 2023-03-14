//изменение имени
const popupEdit = document.querySelector('.popupEdit');
const openEdit = document.querySelector('.profile__edit');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const formElement = document.querySelector('.popupEdit__form');
const nameInput = formElement.querySelector('.popupEdit__input_type_name');
const aboutInput = formElement.querySelector('.popupEdit__input_type_about');

function openPopup (popup) {
  popup.classList.add('popup_opened');
}

function closePopup (popup) {
  popup.classList.remove('popup_opened');
}

function openPopupEdit () {
  openPopup(popupEdit);
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
}

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  closePopup (popupEdit);
}

openEdit.addEventListener('click', openPopupEdit);
formElement.addEventListener('submit', handleFormSubmit);

//изменение элементов
const popupAdd = document.querySelector('.popupAdd');
const formElementAdd = document.querySelector('.popupAdd__form');
const openAdd = document.querySelector('.profile__add');
const placeElement = formElementAdd.querySelector('.popupAdd__input_type_place');
const linkElement = formElementAdd.querySelector('.popupAdd__input_type_link');
const elementList = document.querySelector('.element');
const elementTemplate = document.querySelector('#element-template');
const popupImage = document.querySelector('.popupImage');
const popupImagePlace = document.querySelector('.popupImage__place');
const popupImageImage = document.querySelector('.popupImage__image');

openAdd.addEventListener('click', () => openPopup(popupAdd));

function create (element) {
  let copyElement = elementTemplate.content.cloneNode('true');
  copyElement.querySelector('.element__title').textContent = element.place;
  copyElement.querySelector('.element__image').src = element.link;
  copyElement.querySelector('.element__image').alt = element.place;
  //удаление элементов
  copyElement.querySelector('.element__trash').addEventListener('click', function (elementDelete) {elementDelete.target.closest('.element__list').remove();});
  //добавление лайков
  copyElement.querySelector('.element__like').addEventListener('click', function (elementLike) {elementLike.target.classList.toggle('element__like_active');});
  //открытие картинки
  copyElement.querySelector('.element__image').addEventListener('click', function () {
    openPopup(popupImage);
    popupImagePlace.textContent = element.place;
    popupImageImage.src = element.link;
    popupImageImage.alt = element.place;
  });

  return copyElement;
}

function handleElementSubmit (evt) {
  evt.preventDefault();
  let newElement = {};
  newElement.place = placeElement.value;
  newElement.link = linkElement.value;
  elementList.prepend(create(newElement));
  evt.target.reset();
  closePopup(popupAdd);
}

formElementAdd.addEventListener('submit', handleElementSubmit);

//добавление начальных элементов
const initialCards = [
  {
    place: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    place: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    place: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    place: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    place: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    place: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

function initialElements (element) {
  let initialElement = create(element);
  elementList.prepend(initialElement);
};

initialCards.forEach(initialElements);

// находим все крестики проекта по универсальному селектору
const closeButtons = document.querySelectorAll('.popup__close');

closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап 
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup));
});