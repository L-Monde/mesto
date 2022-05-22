export class Card {
    constructor(data, cardTemplateSelector, userInfo, { handleImageClick, handleDeleteClick, likeCard, dislikeCard }) {
        this._cardTemplate = document.querySelector(cardTemplateSelector).content.querySelector('.element')
        this._name = data.name;
        this._link = data.link;
        this._handleImageClick = handleImageClick
        this._handleDeleteClick = handleDeleteClick;
        this._likeCard = likeCard;
        this._dislikeCard = dislikeCard;
        this._likes = data.likes;
        this._elementID = data._id;
        this._userInfo = userInfo
        this._ownerId = data.owner._id
    }

    createCard() {
        this._newCard = this._cardTemplate.cloneNode(true);
        /* */
        this._newCardImage = this._newCard.querySelector('.element__image');
        this._newCardName = this._newCard.querySelector('.element__name');
        this._likeButton = this._newCard.querySelector('.element__button-like');

        this._likesCount = this._newCard.querySelector('.element__likes-count')
        this._likesCount.textContent = this._likes.length
        this._newCardName.textContent = this._name;
        this._newCardImage.alt = this._name;
        const deleteButton = this._newCard.querySelector('.element__button-delete');
        this._newCardImage.src = this._link;
        this._userInfo.then(res => {
            if (res._id !== this._ownerId) {
                deleteButton.remove()
            }
        })
        this._setEventListeners();
        this._checkLikes();

        return this._newCard
    }


    _like(event) {
        const hasLike = event.target.classList.contains('element__button-like_pressed')
        if (!hasLike) {
            this._likeCard(this._elementID)
                .then(res => {
                    console.log(res)
                    this._likesCount.textContent = res.likes.length
                    event.target.classList.add('element__button-like_pressed')
                })
                .catch(err => console.log("Не удалось поставить лайк:", err))
        } else {
            this._dislikeCard(this._elementID)
                .then(res => {
                    this._likesCount.textContent = res.likes.length
                    event.target.classList.remove('element__button-like_pressed')
                })
                .catch(err => console.log("Не удалось удалить лайк:", err))
        }
    }
    _checkLikes() {
        this._userInfo.then(res => {
            this._likes.forEach(item => {
                if (item._id === res._id) {
                    this._likeButton.classList.add('element__button-like_pressed')
                }
            })
        })
    }





    _deleteCard = () => {
        this._newCard.remove()
            //this._newCard = null
    }

    _setEventListeners() {
        const deleteButton = this._newCard.querySelector('.element__button-delete');
        deleteButton.addEventListener('click', () => {
            this._handleDeleteClick(this._elementID)
                //this._deleteCard()
        });
        this._likeButton.addEventListener('click', () => this._like(event));
        this._newCardImage.addEventListener('click', () => {
            this._handleImageClick({ name: this._name, link: this._link })
        })
    }

}
/*
popupPicture.src = this._link;
popupPicture.alt = this._name;
popupText.textContent = this._name;
openPopup(popupImage);
*/