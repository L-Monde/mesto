/*Я бы хотел извиниться за то,
что несколько раз отправлял работу почти без изменений.
Из-за какой-то неполадки отмеченные ошибки не отображались в работе, сейчас всё в порядке.
Позвольте выразить мою огромную благодарность за ваше многократное терпение.*/


//buttons
const buttonEdit = document.querySelector('.profile__button-edit');
const buttonAdd = document.querySelector('.profile__button-add');
const buttonProfileClose = document.querySelector('.popup__profile-button-close');
const buttonAddClose = document.querySelector('.popup__add-button-close');
const buttonImageClose = document.querySelector('.popup__image-button-close');
//content template
const element = document.querySelector('.element');
const cardsContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('.element-template').content;
//profile popup variables
const form = document.querySelector('.popup__form');
const popupProfile = document.querySelector('.popup-profile-edit');
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
//image popup
const popupImage = document.querySelector('.popup-image');
const popupPicture = document.querySelector('.popup__image-pic');
const popupText = popupImage.querySelector('.popup__image-text');
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

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function copy() {
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
    newElement.name = placeName.value;
    newElement.link = placeImage.value;
    cardsContainer.prepend(createCard());
    closePopup(popupAdd);
}
//creates a card template, each has name, image src and alt
function createCard() {
    const newCard = cardTemplate.cloneNode(true);
    newCard.querySelector('.element__name').textContent = newElement.name;
    newCard.querySelector('.element__image').src = newElement.link;
    newCard.querySelector('.element__image').alt = newElement.name;
    newCard.querySelector('.element__image').addEventListener('click', () => {
        const target = event.target;
        popupPicture.src = target.src;
        popupPicture.alt = target.alt;
        popupText.textContent = target.alt;
        openPopup(popupImage);
    });
    newCard.querySelector('.element__button-delete').addEventListener('click', deleteCard);
    newCard.querySelector('.element__button-like').addEventListener('click', likeCard);
    return newCard
}
//generates content, invoked only when page is loaded
function generateContent() {
    for (i = 0; i < initialCards.length; i++) {
        newElement = initialCards[i];
        cardsContainer.append(createCard());
    }
}


//deletes the card in which the button is activated
function deleteCard() {
    event.target.closest('.element').remove()
}

function likeCard() {
    const target = event.target;
    console.log(target);
    target.classList.toggle('element__button-like_pressed');
}

//content and profile button functions
buttonAdd.addEventListener('click', () => {
    const cards = elements.querySelectorAll('.element');
    if (cards.length == 0) {
        popupAdd.classList.add('popup__empty')
    } else {
        popupAdd.classList.remove('popup__empty')
    }
    openPopup(popupAdd);
});
formAdd.addEventListener('submit', updateContent);

buttonEdit.addEventListener('click', () => {
    copy();
    openPopup(popupProfile);
});
form.addEventListener('submit', updateProfile);

buttonProfileClose.addEventListener('click', () => closePopup(popupProfile));
buttonAddClose.addEventListener('click', () => closePopup(popupAdd));
buttonImageClose.addEventListener('click', () => closePopup(popupImage));

document.onload = generateContent();


/*


*/