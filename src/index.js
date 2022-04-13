//import { openPopup, closePopup } from './scripts/utils.js';
//import { popupImage, popupPicture, popupText } from './scripts/constants.js'
import { FormValidator } from './components/FormValidator.js'
import { Card } from './components/Card.js'
import { Popup } from './components/Popup.js'
import { PopupWithForm } from './components/PopupWithForm.js'
import { Section } from './components/Section.js';
import './pages/index.css';
import { PopupWithImage } from './components/PopupWithImage.js';
import { UserInfo } from './components/UserInfo.js';

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
const popupProfile = new PopupWithForm('.popup-profile-edit', updateProfile);
const formProfile = document.querySelector('.popup__form');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const formName = document.querySelector('.popup__edit_type_name');
const formDesc = document.querySelector('.popup__edit_type_description');
//content popup variables
const popupAdd = new PopupWithForm('.popup-add', updateContent);
const formAdd = document.querySelector('.popup__form-add');
const placeName = document.querySelector('.popup__edit_type_place-name');
const placeImage = document.querySelector('.popup__edit_type_place-picture');
//image popup stuff
const popupImage = new PopupWithImage('.popup-image')
    //user information
const userInfo = new UserInfo({ nameSelector: '.profile__name', descriptionSelector: '.profile__description' })

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
//this class fills the container with cards created by the class's callback
const section = new Section({ items: initialCards, renderer: addCardToBeginning }, '.elements');
section.renderItems()

//card creation functions
function createCardMarkup(data, cardTemplateSelector) {
    const card = new Card(data, cardTemplateSelector);
    return card.createCard();
}


function addCardToBeginning(data) {
    const newCard = createCardMarkup(data, '.element-template');
    newCard.querySelector('.element__image').addEventListener('click', () => { popupImage.open(newCard) })
    return newCard
}

//form submit functions
function updateProfile() {
    event.preventDefault();
    userInfo.setUserInfo(formName.value, formDesc.value)
    popupProfile.close();
}

function updateContent() {
    event.preventDefault();
    const newElement = { name: placeName.value, link: placeImage.value }
    cardsContainer.prepend(addCardToBeginning(newElement))
    popupAdd.close();
}

function copyProfilePopup(name, info) {
    formName.value = name;
    formDesc.value = info;
}


//content popup listeners
popupAdd.setEventListeners();
buttonAdd.addEventListener('click', () => {
    popupAdd.open();
    newCardValidator.toggleButtonState()
});


//profile popup listeners
popupProfile.setEventListeners()
buttonEdit.addEventListener('click', () => {
    const { name, info } = userInfo.getUserInfo()
    console.log({ name, info })
    copyProfilePopup(name, info);
    popupProfile.open();
    popupProfile.setEventListeners()
});

//image popup listeners
popupImage.setEventListeners()





/*
 */