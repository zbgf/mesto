import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import './index.css';

const buttonOpenEdit = document.querySelector('.profile__edit');
const formProfileEdit = document.querySelector('.popupEdit__form');
const nameInput = formProfileEdit.querySelector('.popup__input_type_name');
const aboutInput = formProfileEdit.querySelector('.popup__input_type_about');
const formElementAdd = document.querySelector('.popupAdd__form');
const buttonOpenAdd = document.querySelector('.profile__add');

const selectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  invalidSubmitButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_error',
  activeErrorClass: 'popup__error_active'
};

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


const userInfo = new UserInfo({profileName: '.profile__name', profileAbout: '.profile__about'});
userInfo.getUserInfo();

const popupFormProfilEdit = new PopupWithForm('.popupEdit', () => {userInfo.setUserInfo()});
popupFormProfilEdit.setEventListeners();

buttonOpenEdit.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.profileName;
  aboutInput.value = userData.profileAbout;

  popupFormProfilEdit.open();
})


const popupImage = new PopupWithImage('.popupImage');
popupImage.setEventListeners();

const cardList = new Section( {
  items: initialCards,
  renderer: element => {
    const card = new Card( {data: element, handleCardClick: () => {popupImage.open(element)}}, '#element-template');
    cardList.addItem(card.create());
  } 
}, '.element')
cardList.renderElements();

const popupAdd = new PopupWithForm('.popupAdd', element => {
  const card = new Card( {data: element, handleCardClick: () => {popupImage.open(element)}}, '#element-template');
  cardList.addItem(card.create());
})
popupAdd.setEventListeners();

buttonOpenAdd.addEventListener('click', () => {
  formElementAddValidator.resetValidation();
  popupAdd.open();
})


const formProfileEditValidator = new FormValidator(selectors, formProfileEdit);
formProfileEditValidator.enableValidation();

const formElementAddValidator = new FormValidator(selectors, formElementAdd);
formElementAddValidator.enableValidation();