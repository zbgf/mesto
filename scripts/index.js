//изменение имени
let popupEdit = document.querySelector('.popupEdit');
let openEdit = document.querySelector('.profile__edit');
let closeEdit = document.querySelector('.popupEdit__close');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');
let formElement = document.querySelector('.popupEdit__form');
let nameInput = formElement.querySelector('.popupEdit__input_type_name');
let aboutInput = formElement.querySelector('.popupEdit__input_type_about');

function openPopup () {
  popupEdit.classList.add('popupEdit_opened');
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
}

function closePopup () {
  popupEdit.classList.remove('popupEdit_opened');
}

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  closePopup ();
}

openEdit.addEventListener('click', openPopup);
closeEdit.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);


//изменение элементов
let popupAdd = document.querySelector('.popupAdd');
let formElementAdd = document.querySelector('.popupAdd__form');
let openAdd = document.querySelector('.profile__add');
let closeAdd = document.querySelector('.popupAdd__close')
let placeElement = formElementAdd.querySelector('.popupAdd__input_type_place');
let linkElement = formElementAdd.querySelector('.popupAdd__input_type_link');
let elementList = document.querySelector('.element');
let elementTemplate = document.querySelector('#element-template');

function openPopupAdd () {
  popupAdd.classList.add('popupAdd_opened');
}

function closePopupAdd () {
  popupAdd.classList.remove('popupAdd_opened');
}

openAdd.addEventListener('click', openPopupAdd);
closeAdd.addEventListener('click', closePopupAdd);

function create (element) {
  let copyElement = elementTemplate.content.cloneNode('true');
  copyElement.querySelector('.element__title').textContent = element.place;
  copyElement.querySelector('.element__image').src = element.link;
  //удаление элементов
  copyElement.querySelector('.element__trash').addEventListener('click', function (elementDelete) {
    elementDelete.target.closest('.element__list').remove();
  });
  //добавление лайков
  copyElement.querySelector('.element__like').addEventListener('click', function (elementLike) {
    elementLike.target.classList.toggle('element__like_active');
  });
  return copyElement;
}

function handleElementSubmit(evt) {
  evt.preventDefault();
  let newElement = {};
  newElement.place = placeElement.value;
  newElement.link = linkElement.value;
  elementList.prepend(create(newElement));
  closePopupAdd();
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
}

initialCards.forEach(initialElements);
