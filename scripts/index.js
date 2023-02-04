let popup = document.querySelector('.popup');
let open = document.querySelector('.profile__edit');
let close = document.querySelector('.popup__close');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input_type_name');
let aboutInput = formElement.querySelector('.popup__input_type_about');


function openPopup () {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
}

function closePopup () {
  popup.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  closePopup ();
}


open.addEventListener('click', openPopup);
close.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);