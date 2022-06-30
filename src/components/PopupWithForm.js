import { Popup } from "./Popup";


export class PopupWithForm extends Popup {
    constructor(popupSelector, formSubmit) {
        super(popupSelector)
        this.formSubmit = formSubmit
        this.form = this._popup.querySelector('.popup__form')
        this._inputs = Array.from(this.form.querySelectorAll('.popup__edit'))
        this._button = this._popup.querySelector('.popup__button-submit')
    }

    _getInputValues() {
        const values = {}
        this._inputs.forEach((input) => {
            values[input.name] = input.value
        })
        return values
    }

    setEventListeners() {
        super.setEventListeners()
        this.form.addEventListener('submit', () => {
            event.preventDefault()
            this.formSubmit(this._getInputValues())

        })
    }

    close() {
        super.close()
        this.form.reset()
    }
    loadingText(loading, popup) {
        if (loading) {
            this._button.textContent = 'Сохранение...'
        } else {
            if (popup === 'add') {
                this._button.textContent = 'Создать'
            } else {
                this._button.textContent = 'Сохранить'
            }
        }
    }
}