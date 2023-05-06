export class FormValidator {
  constructor(data, formElement) {
    this._formElement = formElement;
    this._formSelector = data.formSelector;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._invalidSubmitButtonClass = data.invalidSubmitButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._activeErrorClass = data.activeErrorClass;
  }

  _showInputError (input, validationMessage) {
    const errorElement = this._formElement.querySelector(`.popup__error_${input.id}`);
    errorElement.textContent = validationMessage;
    input.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._activeErrorClass);
  };

  _hideInputError (input) {
    const errorElement = this._formElement.querySelector(`.popup__error_${input.id}`);
    input.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._activeErrorClass);
    errorElement.textContent = ' ';
  };

  _checkValidity (input) {
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  };

  _enableButton () {
    this._buttonElement.classList.remove(this._invalidSubmitButtonClass);
    this._buttonElement.disabled = false;
  };
  
  _disableButton () {
    this._buttonElement.classList.add(this._invalidSubmitButtonClass);
    this._buttonElement.disabled = true;
  };

  _toggleButton () {
    if (this._hasInvalidInput(this._inputList)) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  };

  _hasInvalidInput () {
    return this._inputList.some((input) => {return !input.validity.valid});
  };

  enableValidation () {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._toggleButton();
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkValidity(input);
        this._toggleButton();
      });
    });
  };

  resetValidation() {
    this._toggleButton(); 
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  };
}