import { openPopup, closePopup } from './utils.js';
import { popupImage, popupPicture, popupText } from './constants.js'
import { FormValidator } from './FormValidator.js'
import { Card } from './Card.js'

//buttons
const buttonEdit = document.querySelector('.profile__button-edit');
const buttonAdd = document.querySelector('.profile__button-add');
const buttonProfileClose = document.querySelector('.popup__profile-button-close');
const buttonAddClose = document.querySelector('.popup__add-button-close');
const buttonImageClose = document.querySelector('.popup__image-button-close');
//content template
const cardsContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('.element-template').content;
//profile popup variables
const popupProfile = document.querySelector('.popup-profile-edit');
const formProfile = document.querySelector('.popup__form');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const formName = document.querySelector('.popup__edit_type_name');
const formDesc = document.querySelector('.popup__edit_type_description');
//content popup variables
const popupAdd = document.querySelector('.popup-add');
const formAdd = document.querySelector('.popup__form-add');
const placeName = document.querySelector('.popup__edit_type_place-name');
const placeImage = document.querySelector('.popup__edit_type_place-picture');
const elements = document.querySelector('.elements');
const buttonAddSubmit = formAdd.querySelector('.popup__button-submit')
    //image popup

//validator variables and objects
const config = {
    formSelector: '.popup__form',
    editSelector: '.popup__edit',
    submitButtonSelector: '.popup__button-submit',
    inactiveButtonClass: 'popup__button-submit:disabled',
    inputErrorClass: 'popup__edit_error',
    errorClass: 'popup__error_visible'
};
const profileValidator = new FormValidator(config, formProfile);
const newCardValidator = new FormValidator(config, formAdd);
profileValidator.enableValidation();
newCardValidator.enableValidation();



//cards array, page content loads from here
const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

function copyProfilePopup() {
    formName.value = profileName.textContent;
    formDesc.value = profileDescription.textContent;
}

function updateProfile() {
    event.preventDefault();
    profileName.textContent = formName.value;
    profileDescription.textContent = formDesc.value;
    closePopup(popupProfile);
}

function updateContent() {
    event.preventDefault();
    const newElement = { name: placeName.value, link: placeImage.value }
    addCardToEnd(newElement)
    formAdd.reset();
    closePopup(popupAdd);
}
//generates content, invoked only when page is loaded
function createCardMarkup(data, cardTemplateSelector) {
    const card = new Card(data, cardTemplateSelector);
    card.createCard();
    return card;
}

function generateContent() {
    for (var i = 0; i < initialCards.length; i++) {
        const newCard = createCardMarkup(initialCards[i], '.element-template').createCard()
        addCardToBeginning(newCard)
    }
}
//card addition functions
function addCardToBeginning(newCard) {
    cardsContainer.append(newCard);
}

function addCardToEnd(newElement) {
    const newCard = createCardMarkup(newElement, '.element-template').createCard()
    cardsContainer.prepend(newCard);
}


//content popup listeners
popupAdd.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
        closePopup(popupAdd)
    }
})
buttonAdd.addEventListener('click', () => {
    placeName.value = '';
    placeImage.value = '';
    openPopup(popupAdd);
    newCardValidator.toggleButtonState()
});
formAdd.addEventListener('submit', updateContent);

//profile popup listeners
popupProfile.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
        closePopup(popupProfile)
    }
})
buttonEdit.addEventListener('click', () => {
    copyProfilePopup();
    openPopup(popupProfile);
});
formProfile.addEventListener('submit', updateProfile);

//image popup listeners
popupImage.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
        closePopup(popupImage)
    }
})

buttonProfileClose.addEventListener('click', () => closePopup(popupProfile));
buttonAddClose.addEventListener('click', () => closePopup(popupAdd));
buttonImageClose.addEventListener('click', () => closePopup(popupImage));


document.onload = generateContent();


/*
 */