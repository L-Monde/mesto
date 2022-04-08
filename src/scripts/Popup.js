export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }


    open() {
        this._popup.classList.add('popup_opened');
        this.addEventListener('keydown', escapeButtonClose)
    }

    close() {
        this._popup.classList.remove('popup_opened');
        this.removeEventListener('keydown', escapeButtonClose)

    }

    _handleEscClose(event) {
        if (event.key === 'Escape') {
            const activePopup = document.querySelector('.popup_opened')
            this.close()
        }
    }

    setEventListeners() {}
    removeEventListeners() {}
}