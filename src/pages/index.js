import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import './index.css';

const buttonOpenEdit = document.querySelector('.profile__edit');
const formProfileEdit = document.querySelector('.popupEdit__form');
const nameInput = formProfileEdit.querySelector('.popup__input_type_name');
const aboutInput = formProfileEdit.querySelector('.popup__input_type_about');
const formElementAdd = document.querySelector('.popupAdd__form');
const buttonOpenAdd = document.querySelector('.profile__add');
const formAvatarEdit = document.querySelector('.popupAvatarEdit');
const buttonAvatarEdit = document.querySelector('.profile__avatarEdit');

const selectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  invalidSubmitButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_error',
  activeErrorClass: 'popup__error_active'
};

const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-68',
    headers: {
      authorization: '10e9c4a8-f3b5-4b69-81f6-f55fe8e9d1ca',
      'Content-Type': 'application/json'
    }
});

let userId;

const userInfo = new UserInfo({profileName: '.profile__name', profileAbout: '.profile__about', profileAvatar: '.profile__image'});

const popupFormProfilEdit = new PopupWithForm('.popupEdit', data => {
  popupFormProfilEdit.makeTextSave(); 
  api.setUserData(data)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupFormProfilEdit.close();
    })
    .finally(() => {
      popupFormProfilEdit.returnMainText();
    })
  }
);
popupFormProfilEdit.setEventListeners();

buttonOpenEdit.addEventListener('click', () => {
  formProfileEditValidator.resetValidation();
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  aboutInput.value = userData.about;
  popupFormProfilEdit.open();
});

const popupImage = new PopupWithImage('.popupImage');
popupImage.setEventListeners();

const createCard = (data) => {
  const cardItem = new Card(data, {
    handleCardOpenImage: (name, image) => {popupImage.open(name, image)},
    handleCardDelete: (cardElement, cardId) => {popupWithConfirmationDelete.open(cardElement, cardId)},
    handleCardAddLike: (cardId) => {api.addLike(cardId)
        .then((res) => {cardItem.toggleLike(res)})
    },
    handleCardDeleteLike: (cardId) => {api.deleteLike(cardId)
        .then((res) => {cardItem.toggleLike(res)})
    },
  }, '#element-template', userId, {cardId: data._id, authorId: data.owner._id,});
  return cardItem.create();
};

const cardList = new Section({
  renderer: (cardElement) => {cardList.addItem(createCard(cardElement));}
}, '.element');

const popupAdd = new PopupWithForm('.popupAdd', data => { 
  popupAdd.makeTextSave(); 
  api.addNewCard({ name: data.place, link: data.link })
    .then((card) => {
      cardList.addItem(createCard(card));
      popupAdd.close();
    })
    .finally(() => {
      popupAdd.returnMainText();
    })
  }
);
popupAdd.setEventListeners();

buttonOpenAdd.addEventListener('click', () => {
  popupAdd.open();
  formElementAddValidator.resetValidation();
});

const popupEditeAvatar = new PopupWithForm('.popupAvatarEdit', data => { 
  popupEditeAvatar.makeTextSave(); 
  api.setAvatarData(data)
    .then((data) => {
      userInfo.setUserAvatar(data.avatar);
      popupEditeAvatar.close();
    })
    .finally(() => {
      popupEditeAvatar.returnMainText();
    })
  }
);
popupEditeAvatar.setEventListeners();

buttonAvatarEdit.addEventListener('click', () => {
  popupEditeAvatar.open();
  formElementAvatarEditValidator.resetValidation();
});

const popupWithConfirmationDelete = new PopupWithConfirmation('.popupConfirmDeleteCard', {
  callbackConfirmationDelete : (cardElement, cardId) => { 
    api.deleteCard(cardId)
    .then(() => {
      cardElement.deleteCard();
      popupWithConfirmationDelete.close();
    })
  }
});
popupWithConfirmationDelete.setEventListeners();


Promise.all([ 
  api.getUserData(), 
  api.getInitialCards() 
])
  .then(([data, cardElement]) => {
    userId = data._id;
    userInfo.setUserInfo({ name: data.name, about: data.about });
    cardList.renderElements(cardElement.reverse());
    userInfo.setUserAvatar(data.avatar);
  })


const formProfileEditValidator = new FormValidator(selectors, formProfileEdit);
formProfileEditValidator.enableValidation();

const formElementAddValidator = new FormValidator(selectors, formElementAdd);
formElementAddValidator.enableValidation();

const formElementAvatarEditValidator = new FormValidator(selectors, formAvatarEdit);
formElementAvatarEditValidator.enableValidation();
