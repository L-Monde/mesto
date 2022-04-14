import { Popup } from "./Popup";


export class PopupWithForm extends Popup {
    constructor(popupSelector, formSubmit) {
        super(popupSelector)
        this.formSubmit = formSubmit
        this.form = this._popup.querySelector('.popup__form')
        this._inputs = Array.from(this.form.querySelectorAll('.popup__edit'))
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
}