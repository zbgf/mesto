import {Card} from "./Card.js";
import {FormValidator} from "./FormValidator.js";

//изменение имени
const popupEdit = document.querySelector('.popupEdit');
const buttonOpenEdit = document.querySelector('.profile__edit');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const formProfileEdit = document.querySelector('.popupEdit__form');
const nameInput = formProfileEdit.querySelector('.popup__input_type_name');
const aboutInput = formProfileEdit.querySelector('.popup__input_type_about');

export function openPopup (popup) {
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

function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  closePopup (popupEdit);
}

buttonOpenEdit.addEventListener('click', openPopupEdit);
formProfileEdit.addEventListener('submit', handleProfileFormSubmit);

//изменение элементов
const popupAdd = document.querySelector('.popupAdd');
const formElementAdd = document.querySelector('.popupAdd__form');
const buttonOpenAdd = document.querySelector('.profile__add');
const placeElement = formElementAdd.querySelector('.popup__input_type_place');
const linkElement = formElementAdd.querySelector('.popup__input_type_link');
const elementList = document.querySelector('.element');
const elementTemplate = document.querySelector('#element-template');
export const popupImage = document.querySelector('.popupImage');
export const popupImagePlace = document.querySelector('.popupImage__place');
export const popupImageImage = document.querySelector('.popupImage__image');

buttonOpenAdd.addEventListener('click', () => openPopup(popupAdd));

function handleElementSubmit (evt) {
  evt.preventDefault();
  const elementNew = {};
  elementNew.name = placeElement.value;
  elementNew.link = linkElement.value;
  elementList.prepend(addElement(elementNew));
  evt.target.reset();
  formElementAddValidator.resetValidation();
  closePopup(popupAdd);
}

formElementAdd.addEventListener('submit', handleElementSubmit);

function addElement(data) {
  const card = new Card(data, '#element-template');
  return card.create();
}

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

function renderInitialElements (element) {
  const initialElement = addElement(element);
  elementList.prepend(initialElement);
};

initialCards.forEach(renderInitialElements);

// находим все крестики проекта по универсальному селектору
const closeButtons = document.querySelectorAll('.popup__close');

closeButtons.forEach((button) => {
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
    closePopup(evt.target);
  }
}

popupEdit.addEventListener('click', closePopupOutside);
popupAdd.addEventListener('click', closePopupOutside);
popupImage.addEventListener('click', closePopupOutside);

const selectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  invalidSubmitButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_error',
  activeErrorClass: 'popup__error_active'
};

const formProfileEditValidator = new FormValidator(selectors, formProfileEdit);
formProfileEditValidator.enableValidation();

const formElementAddValidator = new FormValidator(selectors, formElementAdd);
formElementAddValidator.enableValidation();