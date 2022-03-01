//Спасибо вам огромное!

const enableValidation = (elements) => {
    const formList = document.querySelectorAll(elements.formSelector);
    formList.forEach((form) => {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
        })
        setEventListeners(form, elements)
    })
}

//here we separately take two forms, and assign event listeners to each one 

//this function should add the event listeners
function setEventListeners(formList, elements) {
    const editList = Array.from(formList.querySelectorAll(elements.editSelector));
    const buttonElement = formList.querySelector(elements.submitButtonSelector)
    toggleButtonState(editList, buttonElement);
    editList.forEach((editItem) => {
        editItem.addEventListener('input', function() {
            checkInputValidity(editItem, elements)
            toggleButtonState(editList, buttonElement);
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

function hasInvalidInput(editList) {
    return editList.some(editItem => {
        return !editItem.validity.valid
    })
}




//if at least one of the inputs is invalid, the button won't work
function toggleButtonState(editList, buttonElement) {
    if (hasInvalidInput(editList)) {
        buttonElement.classList.add(elements.inactiveButtonClass)
        buttonElement.setAttribute('disabled', '')
    } else {
        buttonElement.classList.remove(elements.inactiveButtonClass)
        buttonElement.removeAttribute('disabled')
    }
}
enableValidation({
    formSelector: '.popup__form',
    editSelector: '.popup__edit',
    submitButtonSelector: '.popup__button-submit',
    inactiveButtonClass: 'popup__button-submit:disabled',
    inputErrorClass: 'popup__edit_error',
    errorClass: 'popup__error_visible'
});