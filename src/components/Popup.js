export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }


    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose)
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose)

    }

    _handleEscClose = (event) => {
        if (event.key === 'Escape') {
            this.close()
        }
    }

    setEventListeners() {
        this._popup.closest('.popup').addEventListener('click', (event) => {
            if (event.target.classList.contains('popup__close') || event.target == event.currentTarget) {
                this.close(this._popup)
            }
        })
        this._popup.querySelector('.popup__button-close').addEventListener('click', () => {
            this.close(this._popup)
        })
    }

}