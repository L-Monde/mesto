import { openPopup, closePopup, escapeButtonClose } from './utils.js'
import { popupImage, popupPicture, popupText } from './constants.js'

export class Card {
    constructor(data, cardTemplateSelector) {
        this._cardTemplate = document.querySelector(cardTemplateSelector).content.querySelector('.element')
        this._name = data.name;
        this._link = data.link;
    }

    createCard() {
        this._newCard = this._cardTemplate.cloneNode(true);
        this._newCardImage = this._newCard.querySelector('.element__image');
        this._newCardName = this._newCard.querySelector('.element__name');
        this._likeButton = this._newCard.querySelector('.element__button-like');

        this._newCardName.textContent = this._name;
        this._newCardImage.alt = this._name;
        this._newCardImage.src = this._link;
        this._setEventListeners();

        return this._newCard
    }

    _likeCard = () => {
        this._likeButton.classList.toggle('element__button-like_pressed');
    }

    _deleteCard = () => {
        console.log(this._newCard)
        this._newCard.remove()
    }
    _setEventListeners() {
        const deleteButton = this._newCard.querySelector('.element__button-delete');

        this._newCardImage.addEventListener('click', () => {
            popupPicture.src = this._link;
            popupPicture.alt = this._name;
            popupText.textContent = this._name;
            openPopup(popupImage);
        });
        deleteButton.addEventListener('click', this._deleteCard);
        this._likeButton.addEventListener('click', this._likeCard);
    }

}