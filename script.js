const buttonEdit = document.querySelector('.button_edit');
const buttonClose = document.querySelector('.button_close');
const buttonSubmit = document.querySelector('.form__submit');

function popupHide() {
    document.querySelector('.popup').classList.remove('popup_opened');
}

function popupDisplay() {
    document.querySelector('.popup').classList.add('popup_opened');
}

function profileUpdate() {
    const formName = document.querySelector('.form__edit_name').value;
    const formDesc = document.querySelector('.form__edit_desc').value;
    document.querySelector('.profile__name').innerHTML = formName;
    document.querySelector('.profile__description').innerHTML = formDesc;
    document.querySelector('.popup').classList.remove('popup_opened');
}


buttonEdit.addEventListener('click', popupDisplay);
buttonClose.addEventListener('click', popupHide);
buttonSubmit.addEventListener('click', profileUpdate);