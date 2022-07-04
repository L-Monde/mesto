import { FormValidator } from '../components/FormValidator.js'
import { Card } from '../components/Card.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import { Section } from '../components/Section.js';
import './index.css';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';
import { UserInfo } from '../components/UserInfo.js';
import { api } from '../components/Api.js'
import {
    buttonEdit,
    buttonAdd,
    cards,
    formProfile,
    formName,
    formDesc,
    formAdd,
    avatarOverlay,
    formAvatar,
    config
} from '../utils/constants.js'

//profile popup v&o (variables and objects)
const popupProfile = new PopupWithForm('.popup-profile-edit', updateProfile);
//content popup v&o
const popupAdd = new PopupWithForm('.popup-add', updateContent);
//confirmation popup
const popupDelete = new PopupWithConfirmation('.popup-card-delete', handleConfirmationPopup)
    //image popup
const popupImage = new PopupWithImage('.popup-image')
    //avatar popup
const popupAvatar = new PopupWithForm('.popup-avatar', updateAvatar)

//user information
let userID
const userInfo = new UserInfo({
    nameSelector: '.profile__name',
    descriptionSelector: '.profile__description',
    avatarSelector: '.profile__avatar'
})
const userServerInfo = api.getProfileInfo()
console.log(userServerInfo)


//validator v&o
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
            userID = res[0]._id
            userInfo.setAvatar(res[0].avatar)
            section.renderItems(res[1])
        })
        .catch(err => console.log("Не удалось загрузить страницу:", err))
}

renderPage()
    //here we create card and add it into DOM
function createNewCard(data) {
    const card = new Card(
        data,
        '.element-template',
        userID, {
            handleImageClick,
            handleDeleteClick,
            likeCard,
            dislikeCard
        }
    );
    cards.push(card)
    const newCard = card.createCard()
    return newCard
}

function createCardMarkup(data) {
    const newCard = createNewCard(data)
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

//here we delete the card from the server
function handleConfirmationPopup(elementID) {
    popupDelete.loadingText(true)
    api.deleteCard(elementID)
        .then(() => {
            setTimeout(() => {
                const deleteTarget = cards.find((item) => item._elementID === elementID)
                deleteTarget.deleteCard()
            }, 300)
            popupDelete.close()
        })
        .catch(err => console.log("Не удалось удалить карточку:", err))
        .finally(() => {
            popupDelete.loadingText(false)

        })

}

function handleDeleteClick(elementID) {
    popupDelete.open(elementID)
}

//form submit functions

function updateProfile(data) {
    popupProfile.loadingText(true)
    api.changeProfileInfo(data['form-name'], data['form-description'])
        .then(res => {
                userInfo.setUserInfo(data['form-name'], data['form-description']);
            }, reason => {
                console.error(reason);
            },
            setTimeout(() => {
                popupProfile.close()
            }, 300))
        .catch(err => console.log("Не удалось :", err))
        .finally(() => {
            popupProfile.loadingText(false)
        });
}

function updateContent(data) {
    popupAdd.loadingText(true)

    api.addNewCard(data['place-name'], data['place-description'])
        .then((res) => {
                const newCard = createNewCard(res)
                section.addItem2(newCard)
            }, reason => {
                console.error(reason);
            },
            setTimeout(() => {
                popupAdd.close()
            }, 300))
        .catch(err => console.log("Не удалось :", err))
        .finally(() => {
            popupAdd.loadingText(false)
        })
}

function updateAvatar(data) {
    popupAvatar.loadingText(true)
    api.changeProfileAvatar(data.avatar)
        .then((res) => {
                userInfo.setAvatar(data.avatar)
            }, reason => {
                console.error(reason);
            },
            setTimeout(() => {
                popupAvatar.close()
            }, 300))
        .catch(err => console.log("Не удалось сменить аватар:", err))
        .finally(() => {
            popupAvatar.loadingText(false)
        })
}

function copyProfilePopup(name, info) {
    formName.value = name;
    formDesc.value = info;
}


//content popup listeners
popupAdd.setEventListeners();
buttonAdd.addEventListener('click', () => {
    newCardValidator.resetValidation();
    popupAdd.open();
});


//profile popup listeners
popupProfile.setEventListeners()
buttonEdit.addEventListener('click', () => {
    const { name, info } = userInfo.getUserInfo()
    profileValidator.resetValidation()
    copyProfilePopup(name, info)
    popupProfile.open();
});

//image popup listeners
popupImage.setEventListeners()
    //avatar popup listeners
popupAvatar.setEventListeners()
avatarOverlay.addEventListener('click', () => (
    avatarValidator.resetValidation(),
    popupAvatar.open()
))





/*
 */