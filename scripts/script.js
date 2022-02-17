//buttons
const buttonEdit = document.querySelector('.profile__button-edit');
const buttonAdd = document.querySelector('.profile__button-add');
const buttonClose = document.querySelector('.popup__button-close');
const buttonAddClose = document.querySelector('.popup__add-button-close')
const buttonImageClose = document.querySelector('.popup__image-button-close');

//profile popup variables
const form = document.querySelector('.popup__form');
const popup = document.querySelector('.popup');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const formName = document.querySelector('.popup__edit_type_name');
const formDesc = document.querySelector('.popup__edit_type_description');
//content popup variables
const popupAdd = document.querySelector('.popup-add');
const formAdd = document.querySelector('.popup__form-add')
const newElement = { name: '', link: '' };
const placeName = document.querySelector('.popup__edit_type_place-name');
const placeImage = document.querySelector('.popup__edit_type_place-picture');
const elements = document.querySelector('.elements');
const cards = elements.querySelectorAll('.element');
//image popup
const popupImage = document.querySelector('.popup-image');

//profile popup functions
function popupDisplay() {
    copy();
    popup.classList.add('popup_opened');
}

function popupHide() {
    popup.classList.remove('popup_opened');
}

function copy() {
    formName.value = profileName.textContent;
    formDesc.value = profileDescription.textContent;
}

function profileUpdate() {
    event.preventDefault();
    profileName.textContent = formName.value;
    profileDescription.textContent = formDesc.value;
    popupHide();
}

//content popup functions
function popupAddDisplay() {
    popupAdd.classList.add('popup_opened');
}

function popupAddHide() {
    popupAdd.classList.remove('popup_opened');
}

function contentUpdate() {
    event.preventDefault();
    newElement.name = placeName.value;
    newElement.link = placeImage.value;
    console.log(newElement);
    initialCards.pop();
    let blank = { name: '', link: '' };
    initialCards.unshift(blank);
    blank.name = newElement.name;
    blank.link = newElement.link;
    console.log(initialCards);
    cardsCheck();
    popupAddHide();
};


function popupImageHide() {
    popupImage.classList.remove('popup_opened');
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

//compares info from the markup with the array, then pushes array info into markup
function cardsCheck() {
    cards.forEach(function(item, index) {
        const nameAlt = initialCards[index].name;
        const imageSrcAlt = initialCards[index].link;
        item.querySelector('.element__name').textContent = nameAlt;
        item.querySelector('.element__image').src = imageSrcAlt;
        if (nameAlt == '') {
            item.style.display = 'none'
        }

        console.log(nameAlt);
    });
}
document.onload = cardsCheck();


function cardDelete() {
    const target = event.target;
    console.log(target);
    target.parentElement.style.display = "none";
}

function cardLike() {
    const target = event.target;
    console.log(target);
    target.classList.toggle('element__button-like_pressed');
}

function imageShow() {
    const target = event.target;
    console.log(target);
    document.querySelector('.popup__image-pic').src = target.src;
    popupImage.classList.add('popup_opened');
}

buttonImageClose.addEventListener('click', popupImageHide);

buttonAdd.addEventListener('click', () => {
    popupAddDisplay()
});
buttonAddClose.addEventListener('click', popupAddHide);
formAdd.addEventListener('submit', contentUpdate);

buttonEdit.addEventListener('click', popupDisplay);
buttonClose.addEventListener('click', popupHide);
form.addEventListener('submit', profileUpdate);


/*function cardDelete() {
    const a = Math.floor(Math.random() * 6);
    const b = Math.floor(Math.random() * 6);
    console.log(a);
    initialCards[a].name = initialCards[b].name;
}
*/