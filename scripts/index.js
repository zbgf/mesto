//изменение имени
const popupEdit = document.querySelector('.popupEdit');
const buttonOpenEdit = document.querySelector('.profile__edit');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const formProfileEdit = document.querySelector('.popupEdit__form');
const nameInput = formProfileEdit.querySelector('.popup__input_type_name');
const aboutInput = formProfileEdit.querySelector('.popup__input_type_about');

function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', closePopupEsc);
}

function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', closePopupEsc);
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

buttonOpenEdit.addEventListener('click', openPopupEdit);
formProfileEdit.addEventListener('submit', handleFormSubmit);

//изменение элементов
const popupAdd = document.querySelector('.popupAdd');
const formElementAdd = document.querySelector('.popupAdd__form');
const buttonOpenAdd = document.querySelector('.profile__add');
const placeElement = formElementAdd.querySelector('.popup__input_type_place');
const linkElement = formElementAdd.querySelector('.popup__input_type_link');
const elementList = document.querySelector('.element');
const elementTemplate = document.querySelector('#element-template');
const popupImage = document.querySelector('.popupImage');
const popupImagePlace = document.querySelector('.popupImage__place');
const popupImageImage = document.querySelector('.popupImage__image');

buttonOpenAdd.addEventListener('click', () => openPopup(popupAdd));

function create (element) {
  const elementCopy = elementTemplate.content.cloneNode('true');
  elementCopy.querySelector('.element__title').textContent = element.name;
  elementCopy.querySelector('.element__image').src = element.link;
  elementCopy.querySelector('.element__image').alt = element.name;
  //удаление элементов
  elementCopy.querySelector('.element__trash').addEventListener('click', function (elementDelete) {elementDelete.target.closest('.element__list').remove();});
  //добавление лайков
  elementCopy.querySelector('.element__like').addEventListener('click', function (elementLike) {elementLike.target.classList.toggle('element__like_active');});
  //открытие картинки
  elementCopy.querySelector('.element__image').addEventListener('click', function () {
    openPopup(popupImage);
    popupImagePlace.textContent = element.name;
    popupImageImage.src = element.link;
    popupImageImage.alt = element.name;
  });

  return elementCopy;
}

function handleElementSubmit (evt) {
  evt.preventDefault();
  const elementNew = {};
  elementNew.name = placeElement.value;
  elementNew.link = linkElement.value;
  elementList.prepend(create(elementNew));
  evt.target.reset();
  evt.submitter.classList.add('popup__button_inactive');
  evt.submitter.disabled = true; 
  closePopup(popupAdd);
}

formElementAdd.addEventListener('submit', handleElementSubmit);

//добавление начальных элементов
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

function initialElements (element) {
  const initialElement = create(element);
  elementList.prepend(initialElement);
};

initialCards.forEach(initialElements);

// находим все крестики проекта по универсальному селектору
const buttonClose = document.querySelectorAll('.popup__close');

buttonClose.forEach((button) => {
  // находим 1 раз ближайший к крестику попап 
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup));
});

function closePopupEsc (evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
};

function closePopupOutside (evt) {
  if (evt.target.classList.contains('popup')) {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

popupEdit.addEventListener('click', closePopupOutside);
popupAdd.addEventListener('click', closePopupOutside);
popupImage.addEventListener('click', closePopupOutside);