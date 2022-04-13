import { Popup } from "./Popup";


export class PopupWithForm extends Popup {
    constructor(popupSelector, formSubmit) {
        super(popupSelector)
        this.formSubmit = formSubmit
        this.form = this._popup.querySelector('.popup__form')
    }

    _getInputValues() {
        const inputs = Array.from(this.form.querySelectorAll('.popup__edit'))
        const values = []
        inputs.forEach((input) => {
            values[input] = input.value
        })
    }

    setEventListeners() {
        super.setEventListeners()
        this.form.addEventListener('submit', () => { this.formSubmit() })
    }

    close() {
        super.close()
        Array.from(this.form.querySelectorAll('.popup__edit')).forEach((input) => {
            input.value = ''
        })
    }
}