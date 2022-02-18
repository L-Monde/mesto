//buttons
const buttonEdit = document.querySelector('.profile__button-edit');
const buttonAdd = document.querySelector('.profile__button-add');
const buttonClose = document.querySelector('.popup__button-close');
const buttonAddClose = document.querySelector('.popup__add-button-close');
const buttonImageClose = document.querySelector('.popup__image-button-close');
//content template
const element = document.querySelector('.element');
const cardsContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('.element-template').content;
//profile popup variables
const form = document.querySelector('.popup__form');
const popup = document.querySelector('.popup-profile-edit');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const formName = document.querySelector('.popup__edit_type_name');
const formDesc = document.querySelector('.popup__edit_type_description');
//content popup variables
const popupAdd = document.querySelector('.popup-add');
const formAdd = document.querySelector('.popup__form-add');
const newElement = { name: '', link: '' };
const placeName = document.querySelector('.popup__edit_type_place-name');
const placeImage = document.querySelector('.popup__edit_type_place-picture');
const elements = document.querySelector('.elements');
//image popup
const popupImage = document.querySelector('.popup-image');

//profile popup functions
function displayProfilePopup() {
    copy();
    popup.classList.add('popup_opened');
}

function hidePopup() {
    const target = event.target.parentElement;
    target.parentElement.classList.remove('popup_opened');
}

function copy() {
    formName.value = profileName.textContent;
    formDesc.value = profileDescription.textContent;
}

function updateProfile() {
    event.preventDefault();
    profileName.textContent = formName.value;
    profileDescription.textContent = formDesc.value;
    hidePopup();
}

//content popup functions
function displayPopupAdd() {
    popupAdd.classList.add('popup_opened');
}


function updateContent() {
    event.preventDefault();
    newElement.name = placeName.value;
    newElement.link = placeImage.value;
    createCard(x = newElement);
    const cards = elements.querySelectorAll('.element');
    const cardsTrue = Array.from(cards);
    if (cardsTrue.length > 5) {
        cardsTrue[6].style.display = 'none';
    };
    hidePopup();
}



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


function generateContent() {
    for (i = 0; i < initialCards.length; i++) {
        createCard(x = initialCards[i]);
    }
}

function createCard() {
    const newCard = cardTemplate.cloneNode(true);
    newCard.querySelector('.element__name').textContent = x.name;
    newCard.querySelector('.element__image').src = x.link;
    newCard.querySelector('.element__image').addEventListener('click', displayImagePopup);
    newCard.querySelector('.element__button-delete').addEventListener('click', deleteCard);
    newCard.querySelector('.element__button-like').addEventListener('click', likeCard);
    cardsContainer.prepend(newCard);
}

//compares info from the markup with the array, then pushes array info into markup

//image button functions
function deleteCard() {
    const cards = elements.querySelectorAll('.element');
    const cardsTrue = Array.from(cards);
    const target = event.target;
    const parent = target.parentElement;
    const index = cardsTrue.indexOf(parent)
    parent.parentElement.removeChild(parent);
    initialCards.splice([index], 1);
}

function likeCard() {
    const target = event.target;
    console.log(target);
    target.classList.toggle('element__button-like_pressed');
}

function displayImagePopup() {
    const target = event.target;
    document.querySelector('.popup__image-pic').src = target.src;
    popupImage.classList.add('popup_opened');
}
//content and profile button functions
buttonAdd.addEventListener('click', () => {
    const cards = elements.querySelectorAll('.element');
    if (cards.length == 0) {
        popupAdd.classList.add('popup__empty')
    } else {
        popupAdd.classList.remove('popup__empty')
    }
    displayPopupAdd();
});
formAdd.addEventListener('submit', updateContent);

buttonEdit.addEventListener('click', displayProfilePopup);
form.addEventListener('submit', updateProfile);

buttonClose.addEventListener('click', hidePopup);
buttonAddClose.addEventListener('click', hidePopup);
buttonImageClose.addEventListener('click', hidePopup);

document.onload = generateContent();


/*function cardDelete() {
    const a = Math.floor(Math.random() * 6);
    const b = Math.floor(Math.random() * 6);
    console.log(a);
    initialCards[a].name = initialCards[b].name;
}


cardsContainer.insertAdjacentHTML('beforeend',
            ` <div class="element">
        <img class="element__image" src="${initialCards[i].link}" alt="" onclick="displayImagePopup()">
        <button type="button" class="element__button-delete" onclick="cardDelete()"></button>
        <div class="element__info">
            <h4 class="element__name">${initialCards[i].name}</h4>
            <button type="button" class="element__button-like" aria-label="like" onclick="cardLike()"></button>
        </div>
    </div>`
        )


*/