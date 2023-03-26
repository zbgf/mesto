function showInputError (errorElement, input, validationMessage, config) {
  errorElement.textContent = validationMessage;
  input.classList.add(config.inputErrorClass);
  errorElement.classList.add(config.activeErrorClass);
};

function hideInputError (errorElement, input, config) {
  input.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.activeErrorClass);
  errorElement.textContent = ' ';
};

function checkValidity (formElement, input, config) {
  const errorElement = formElement.querySelector(`.popup__error_${input.id}`);
  if (!input.validity.valid) {
    showInputError(errorElement, input, input.validationMessage, config);
  } else {
    hideInputError(errorElement, input, config);
  }
};

function buttonOn (button, config) {
  button.classList.remove(config.invalidSubmitButtonClass);
  button.disabled = false;
}

function buttonOff (button, config) {
  button.classList.add(config.invalidSubmitButtonClass);
  button.disabled = true;
}

function toggleButton (inputList, button, config) {
  if (hasInvalidInput(inputList)) {
    buttonOff (button, config)
  } else {
    buttonOn (button, config)
  }
}

function hasInvalidInput (inputList) {
  return Array.from(inputList).some((input) => !input.validity.valid);
}

function enableValidation (config) {
  const form = Array.from(document.querySelectorAll(config.formSelector));
  form.forEach((formElement) => {
    const inputList = formElement.querySelectorAll(config.inputSelector);
    const button = formElement.querySelector(config.submitButtonSelector);
    toggleButton(inputList, button, config);
    inputList.forEach((input) => {
      input.addEventListener('input', function () {
        checkValidity(formElement, input, config);
        toggleButton(inputList, button, config);
      });
    });
  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  invalidSubmitButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_error',
  activeErrorClass: 'popup__error_active',
});
