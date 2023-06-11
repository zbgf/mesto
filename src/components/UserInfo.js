export default class UserInfo {
  constructor({profileName, profileAbout}) {
    this._profileName = document.querySelector(profileName);
    this._profileAbout = document.querySelector(profileAbout);
    this._nameInput = document.querySelector('.popup__input_type_name');
    this._aboutInput = document.querySelector('.popup__input_type_about');
  }

  getUserInfo () {
    this._userInfo = {};
    this._userInfo.profileName = this._profileName.textContent;
    this._userInfo.profileAbout = this._profileAbout.textContent;
    return this._userInfo;
  };

  setUserInfo () {
    this._profileName.textContent = this._nameInput.value;
    this._profileAbout.textContent = this._aboutInput.value;
  };
}