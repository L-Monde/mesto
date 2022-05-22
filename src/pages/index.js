import { FormValidator } from '../components/FormValidator.js'
import { Card } from '../components/Card.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import { Section } from '../components/Section.js';
import './index.css';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';
import { UserInfo } from '../components/UserInfo.js';
import { api } from '../components/Api.js'

//buttons
const buttonEdit = document.querySelector('.profile__button-edit');
const buttonAdd = document.querySelector('.profile__button-add');
//content variables
const cardsContainer = document.querySelector('.elements');
const getCardsArray = api.getCardsArray();
//profile popup v&o (variables and objects)
const popupProfile = new PopupWithForm('.popup-profile-edit', updateProfile);
const formProfile = document.querySelector('.popup__form');
const formName = document.querySelector('.popup__edit_type_name');
const formDesc = document.querySelector('.popup__edit_type_description');
//content popup v&o
const popupAdd = new PopupWithForm('.popup-add', updateContent);
const formAdd = document.querySelector('.popup__form-add');
const placeName = document.querySelector('.popup__edit_type_place-name');
const placeImage = document.querySelector('.popup__edit_type_place-picture');
//confirmation popup
const popupDelete = new PopupWithConfirmation('.popup-card-delete', handleConfirmationPopup)

//image popup
const popupImage = new PopupWithImage('.popup-image')

//user information
const userInfo = new UserInfo({ nameSelector: '.profile__name', descriptionSelector: '.profile__description' })
const userServerInfo = api.getProfileInfo();

fetch('https://mesto.nomoreparties.co/v1/cohort-40/users/me', {
        headers: {
            authorization: 'f6e30d96-a451-4ec9-81ba-5b034a8c8256'
        }
    })
    .then(res => res.json())
fetch('https://mesto.nomoreparties.co/v1/cohort-40/cards', {
        headers: {
            authorization: 'f6e30d96-a451-4ec9-81ba-5b034a8c8256'
        }
    })
    .then(res => res.json())

//validator v&o
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

//here we take a cards array from the server and post in on the page
const section = new Section({ renderer: createCardMarkup }, '.elements');

function renderPage() {
    Promise.all([userServerInfo, api.getCardsArray()])
        .then(res => {
            userInfo.setUserInfo(res[0].name, res[0].about)
            section.renderItems(res[1])

        })
        .catch(err => console.log("Не удалось загрузить страницу:", err))
}
renderPage()

//here we create card and add it into DOM
function createCardMarkup(data) {
    const card = new Card(
        data,
        '.element-template',
        userServerInfo, {
            handleImageClick,
            handleDeleteClick,
            likeCard,
            dislikeCard
        }
    );
    /* */
    const newCard = card.createCard()
    section.addItem(newCard)
        //api.addNewCard(card._name, card._link)
        //return;
}


//here we go through the likes functions
function likeCard(elementID) {
    return api.addCardLike(elementID)
}

function dislikeCard(elementID) {
    return api.removeCardLike(elementID)
}

//here we process the image popup
function handleImageClick(data) {
    popupImage.open(data);
}

//here we delete the card from the server
function handleConfirmationPopup(elementID) {
    console.log('deleteTest')
    api.deleteCard(elementID)

    .catch(err => console.log("Не удалось удалить карточку:", err))
    popupDelete.close()
    renderPage()
}

function handleDeleteClick(elementID) {
    popupDelete.open(elementID)
        //handleConfirmationPopup(elementID)
}

//form submit functions
function updateProfile(data) {
    userInfo.setUserInfo(data['form-name'], data['form-description'])
    api.changeProfileInfo(data['form-name'], data['form-description'])
    popupProfile.close();
}

function updateContent(data) {
    console.log(data)
    data.name = data['place-name']
    data.link = data['place-description']
    api.addNewCard(data.name, data.link)
        .then(res => {
            section.addItem(data)
            popupAdd.close()
        })
        .catch(err => console.log("Не удалось добавить карточку:", err))
        //section.addItem(createCardMarkup(data))
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
    copyProfilePopup(name, info);
    popupProfile.open();
});

//image popup listeners
popupImage.setEventListeners()





/*
 */