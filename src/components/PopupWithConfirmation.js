import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
    constructor(popupSelector, handlePopupConfirm) {
        super(popupSelector)
        this._handlePopupConfirm = handlePopupConfirm;
        this._confirmButton = this._popup.querySelector('.popup__button-submit')
        this._confirm = this._confirm.bind(this)
    }

    _confirm() {
        console.log('123')
        this._handlePopupConfirm(this._elementID)
    }

    removeEventListeners() {
        this._confirmButton.removeEventListener('click', this._confirm)
    }

    setEventListeners() {
        super.setEventListeners()
        this._confirmButton.addEventListener('click', this._confirm)
    }

    open(elementID) {
        super.open()
        this._elementID = elementID
        this.setEventListeners()
    }
    close() {
        super.close()
        this.removeEventListeners()
    }
    loadingText(loading) {
        if (loading) {
            this._confirmButton.textContent = 'Сохранение...'
        } else {
            this._confirmButton.textContent = 'Даъ'

        }
    }
}