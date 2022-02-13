const buttonEdit = document.querySelector('.profile__button-edit');
const buttonClose = document.querySelector('.popup__button-close');
const buttonSubmit = document.querySelector('.popup__button-submit');

function popupHide() {
    document.querySelector('.popup').classList.remove('popup_opened');
}

function popupDisplay() {
    document.querySelector('.popup').classList.add('popup_opened');
}

function profileUpdate() {
    const formName = document.querySelector('.popup__edit-name').value;
    const formDesc = document.querySelector('.popup__edit-desc').value;
    document.querySelector('.profile__name').innerHTML = formName;
    document.querySelector('.profile__description').innerHTML = formDesc;
    document.querySelector('.popup').classList.remove('popup_opened');
}

function deleteChanges() {
    document.querySelector('.popup__edit-name').value = "";
    document.querySelector('.popup__edit-desc').value = "";
}


buttonEdit.addEventListener('click', popupDisplay);
buttonClose.addEventListener('click', () => {
    popupHide();
    deleteChanges();
});
buttonSubmit.addEventListener('click', profileUpdate);