let buttonEdit = document.querySelector('.button_edit');
let buttonClose = document.querySelector('.button_close');

function popupHide() {
    document.querySelector('.popup').classList.remove('popup_opened');
}

function popupDisplay() {
    document.querySelector('.popup').classList.add('popup_opened');
}

buttonEdit.addEventListener('click', popupDisplay);
buttonClose.addEventListener('click', popupHide);