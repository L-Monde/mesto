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
//some array I might not even need
const cards = []
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
    //avatar popup
const avatar = document.querySelector('.profile__avatar')
const popupAvatar = new PopupWithForm('.popup-avatar', updateAvatar)
const formAvatar = document.querySelector('.popup__form-avatar')

//user information
const userInfo = new UserInfo({
    nameSelector: '.profile__name',
    descriptionSelector: '.profile__description',
    avatarSelector: '.profile__avatar'
})
const userServerInfo = api.getProfileInfo();


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
const avatarValidator = new FormValidator(config, formAvatar);
profileValidator.enableValidation();
newCardValidator.enableValidation();
avatarValidator.enableValidation();

//here we take a cards array from the server and post in on the page
const section = new Section({ renderer: createCardMarkup }, '.elements');

function renderPage() {
    Promise.all([userServerInfo, api.getCardsArray()])
        .then(res => {
            userInfo.setUserInfo(res[0].name, res[0].about)
            userInfo.setAvatar(res[0].avatar)
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
    const newCard = card.createCard()
    cards.push(card)
    section.addItem(newCard)
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

//here we delete the card from the server document.querySelector(elementID).closest('.element')
function handleConfirmationPopup(elementID) {
    popupDelete.loadingText(true)
    api.deleteCard(elementID)
        .catch(err => console.log("Не удалось удалить карточку:", err))
    let deleteTarget = cards.find((item) => item._elementID === elementID)
    setTimeout(() => {
        popupDelete.loadingText(false)
        deleteTarget._deleteCard()
        popupDelete.close()
    }, 300)
}

function handleDeleteClick(elementID) {
    popupDelete.open(elementID)
}

//form submit functions

function updateProfile(data) {

    userInfo.setUserInfo(data['form-name'], data['form-description'])
    api.changeProfileInfo(data['form-name'], data['form-description'])
    setTimeout(() => {
        popupProfile.close()
        popupProfile.loadingText(false)
    }, 300)
}

function updateContent(data) {
    popupAdd.loadingText(true)

    api.addNewCard(data['place-name'], data['place-description'])
        .then((res) => {
            const card = new Card(
                res,
                '.element-template',
                userServerInfo, {
                    handleImageClick,
                    handleDeleteClick,
                    likeCard,
                    dislikeCard
                }
            );
            cards.push(card)
            const newCard = card.createCard()
            section.addItem2(newCard)
        })
    setTimeout(() => {
        popupAdd.close()
        popupAdd.loadingText(false)
    }, 300)

}

function updateAvatar(data) {
    popupAvatar.loadingText(true)
    api.changeProfileAvatar(data.avatar)
        .then((res) => {
            console.log('avatarChangeNoReload')
            userInfo.setAvatar(data.avatar)
            setTimeout(() => {
                popupAvatar.close()
                popupAvatar.loadingText(false)
            }, 300)
        })
        .catch(err => console.log("Не удалось сменить аватар:", err))
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
    //avatar popup listeners
popupAvatar.setEventListeners()
avatar.addEventListener('click', () => (
    popupAvatar.open()
))





/*
 */