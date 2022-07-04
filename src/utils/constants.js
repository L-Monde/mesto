//buttons
export const buttonEdit = document.querySelector('.profile__button-edit');
export const buttonAdd = document.querySelector('.profile__button-add');
//cards array
export const cards = []
    //profile form
export const formProfile = document.querySelector('.popup__form');
export const formName = document.querySelector('.popup__edit_type_name');
export const formDesc = document.querySelector('.popup__edit_type_description');
//card form
export const formAdd = document.querySelector('.popup__form-add');
//avatar stuff
export const avatarOverlay = document.querySelector('.profile__avatar-overlay')
export const formAvatar = document.querySelector('.popup__form-avatar')
    //validator config
export const config = {
    formSelector: '.popup__form',
    editSelector: '.popup__edit',
    submitButtonSelector: '.popup__button-submit',
    inactiveButtonClass: 'popup__button-submit:disabled',
    inputErrorClass: 'popup__edit_error',
    errorClass: 'popup__error_visible'
};