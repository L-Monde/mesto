const buttonEdit = document.querySelector('.profile__button-edit');
const buttonClose = document.querySelector('.popup__button-close');
const form = document.querySelector('.popup__form');
const popup = document.querySelector('.popup');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const formName = document.querySelector('.popup__form_name');
const formDesc = document.querySelector('.popup__form_description');

function popupHide() {
    popup.classList.remove('popup_opened');
}

function copy() {
    formName.value = profileName.textContent;
    formDesc.value = profileDescription.textContent;
}

function popupDisplay() {
    copy();
    popup.classList.add('popup_opened');
}

function profileUpdate() {
    event.preventDefault();
    profileName.textContent = formName.value;
    profileDescription.textContent = formDesc.value;
    popupHide();
}

buttonEdit.addEventListener('click', popupDisplay);
buttonClose.addEventListener('click', popupHide);

form.addEventListener('submit', profileUpdate);