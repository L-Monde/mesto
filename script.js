const buttonEdit = document.querySelector('.profile__button-edit');
const buttonClose = document.querySelector('.popup__button-close');
const form = document.querySelector('.popup__form');
const popup = document.querySelector('.popup');
const profileName = document.querySelector('.profile__name');
const profilrDescription = document.querySelector('.profile__description');

function popupHide() {
    popup.classList.remove('popup_opened');
}

function popupDisplay() {
    popup.classList.add('popup_opened');
}

function profileUpdate() {
    const formName = document.querySelector('.popup__edit-name').value;
    const formDesc = document.querySelector('.popup__edit-desc').value;
    profileName.textContent = formName;
    profilrDescription.textContent = formDesc;
    popupHide();
}



buttonEdit.addEventListener('click', popupDisplay);
buttonClose.addEventListener('click', () => {
    popupHide();
});

function handleForm(event) { event.preventDefault(); }
form.addEventListener('submit', profileUpdate);