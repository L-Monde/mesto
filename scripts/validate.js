const formList = document.querySelectorAll('.popup__form');
//here we separately take two forms, and assign event listeners to each one 
formList.forEach((form) => {
    form.addEventListener('submit', function(event) {
        event.preventDefault();
    })
    const editList = form.querySelectorAll('.popup__edit')
    const buttonElement = form.querySelector('.popup__button-submit')
    editList.forEach((editItem) => {
        editItem.addEventListener('input', function() {
            checkInputValidity(form, editItem)
            toggleButtonState(editItem, buttonElement);
        })
    })
});


//this function checks the input. If validation is unsuccessful, a message is displayed 
function checkInputValidity(form, editItem) {
    if (!editItem.validity.valid) {

        const errorMessage = document.querySelector(`#${editItem.id}-error`);
        editItem.classList.add('popup__edit_error')
        errorMessage.textContent = editItem.validationMessage;
    } else {
        console.log(editItem.nextSibling)
        const errorMessage = document.querySelector(`#${editItem.id}-error`);
        editItem.classList.remove('popup__edit_error')
        errorMessage.textContent = ''
    }
}
//if at least one of the inputs is invalid, the button won't work
function toggleButtonState(editItem, buttonElement) {
    if (!editItem.validity.valid) {
        buttonElement.classList.add('popup__button-submit_disabled')
        buttonElement.setAttribute('disabled', '')
    } else {
        buttonElement.classList.remove('popup__button-submit_disabled')
        buttonElement.removeAttribute('disabled')
    }
}