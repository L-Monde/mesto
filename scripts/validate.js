//Здраствуйте. Я постарался исправить все ошибки, надеюсь у меня получилось. 
//Если нет, укажите их, пожалуйста, если вам не трудно

const enableValidation = (elements) => {
    const formList = document.querySelectorAll(elements.formSelector);
    console.log(formList)
    formList.forEach((form) => {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
        })
    })
    formList.forEach((formList) => {
        setEventListeners(formList, elements)
    })
}

//here we separately take two forms, and assign event listeners to each one 

//this function should add the event listeners
function setEventListeners(formList, elements) {
    const editList = formList.querySelectorAll(elements.editSelector)
    const buttonElement = formList.querySelector(elements.submitButtonSelector)
    editList.forEach((editItem) => {
        editItem.addEventListener('input', function() {
            checkInputValidity(editItem, elements)
            toggleButtonState(editItem, buttonElement);
        })
        editItem.addEventListener('mouseover', function() {
            toggleButtonState(editItem, buttonElement);
        })
    })
}
//this function checks the input. If validation is unsuccessful, a message is displayed 
function checkInputValidity(editItem, elements) {
    if (!editItem.validity.valid) {
        showInputError(editItem, editItem.validationMessage, elements)
    } else {
        hideInputError(editItem, elements)
    }
}

function showInputError(editItem, errorMessage, elements) {
    const errorElement = document.querySelector(`#${editItem.id}-error`);
    editItem.classList.add(elements.inputErrorClass)
    errorElement.textContent = errorMessage
}

function hideInputError(editItem, elements) {
    const errorElement = document.querySelector(`#${editItem.id}-error`);
    editItem.classList.remove(elements.inputErrorClass)
    errorElement.textContent = ''
}

function hasInvalidInput(inputList) {
    return inputList.some(inputElement => {
        return !inputElement.validity.valid
    })
}




//if at least one of the inputs is invalid, the button won't work
function toggleButtonState(editItem, buttonElement) {
    console.log(editItem.validity)
    if (!editItem.validity.valid) {
        buttonElement.classList.add('popup__button-submit_disabled')
        buttonElement.setAttribute('disabled', '')
    } else {
        buttonElement.classList.remove('popup__button-submit_disabled')
        buttonElement.removeAttribute('disabled')
    }
}
enableValidation({
    formSelector: '.popup__form',
    editSelector: '.popup__edit',
    submitButtonSelector: '.popup__button-submit',
    inactiveButtonClass: 'popup__button-submit_disabled',
    inputErrorClass: 'popup__edit_error',
    errorClass: 'popup__error_visible'
});