import { Popup } from "./Popup";
export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._popupPicture = this._popup.querySelector('.popup__image-pic')
        this._popupText = this._popup.querySelector('.popup__image-text')
    }

    open(image) {
        this._popupPicture.src = image.link;
        this._popupPicture.alt = image.name;
        this._popupText.textContent = image.name;
        super.open()
    }
}