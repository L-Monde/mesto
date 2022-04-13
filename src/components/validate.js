 const config = {
     formSelector: '.popup__form',
     editSelector: '.popup__edit',
     submitButtonSelector: '.popup__button-submit',
     inactiveButtonClass: 'popup__button-submit:disabled',
     inputErrorClass: 'popup__edit_error',
     errorClass: 'popup__error_visible'
 };

 const enableValidation = () => {
     const formList = document.querySelectorAll(config.formSelector);
     formList.forEach((form) => {
         form.addEventListener('submit', function(event) {
             event.preventDefault();
         })
         setEventListeners(form, config)
     })
 }

 //here we separately take two forms, and assign event listeners to each one 

 //this function should add the event listeners
 function setEventListeners(formList, config) {
     const editList = Array.from(formList.querySelectorAll(config.editSelector));
     const buttonElement = formList.querySelector(config.submitButtonSelector)
     toggleButtonState(editList, buttonElement);
     editList.forEach((editItem) => {
         editItem.addEventListener('input', function() {
             checkInputValidity(editItem, config)
             toggleButtonState(editList, buttonElement);
         })

     })
 }
 //this function checks the input. If validation is unsuccessful, a message is displayed 
 function checkInputValidity(editItem, config) {
     if (!editItem.validity.valid) {
         showInputError(editItem, editItem.validationMessage, config)
     } else {
         hideInputError(editItem, config)
     }
 }

 function showInputError(editItem, errorMessage, config) {
     const errorElement = document.querySelector(`#${editItem.id}-error`);
     editItem.classList.add(config.inputErrorClass)
     errorElement.textContent = errorMessage
 }

 function hideInputError(editItem, config) {
     const errorElement = document.querySelector(`#${editItem.id}-error`);
     editItem.classList.remove(config.inputErrorClass)
     errorElement.textContent = ''
 }

 function hasInvalidInput(editList) {
     return editList.some(editItem => {
         return !editItem.validity.valid
     })
 }




 //if at least one of the inputs is invalid, the button won't work
 function toggleButtonState(editList, buttonElement) {
     if (hasInvalidInput(editList)) {
         buttonElement.classList.add(config.inactiveButtonClass)
         buttonElement.setAttribute('disabled', '')
     } else {
         buttonElement.classList.remove(config.inactiveButtonClass)
         buttonElement.removeAttribute('disabled')
     }
 }
 enableValidation(config);