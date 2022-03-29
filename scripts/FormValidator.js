export class FormValidator {
    constructor(settings, form) {
        this._form = form;
        this._settings = settings;
        this._editList = Array.from(this._form.querySelectorAll(this._settings.editSelector));
        this._buttonElement = this._form.querySelector(this._settings.submitButtonSelector)
    }

    enableValidation() {
        this._form.addEventListener('submit', function(event) {
            event.preventDefault();
        });
        this._setEventListeners();
    }


    _toggleButtonState() {
        const { inactiveButtonClass } = this._settings

        if (this._hasInvalidInput()) {
            this._buttonElement.classList.add(inactiveButtonClass)
            this._buttonElement.setAttribute('disabled', '')
        } else {
            this._buttonElement.classList.remove(inactiveButtonClass)
            this._buttonElement.removeAttribute('disabled')
        }
    }

    _hasInvalidInput() {
        return this._editList.some(editItem => {
            return !editItem.validity.valid
        })
    }


    _showInputError(editItem, errorMessage) {
        const { inputErrorClass } = this._settings;
        const errorElement = this._form.querySelector(`#${editItem.id}-error`);
        editItem.classList.add(inputErrorClass)
        errorElement.textContent = errorMessage
    };

    _hideInputError(editItem) {
        const { inputErrorClass } = this._settings;
        const errorElement = this._form.querySelector(`#${editItem.id}-error`);
        editItem.classList.remove(inputErrorClass)
        errorElement.textContent = ''
    };


    _checkInputValidity(editItem) {
        if (!editItem.validity.valid) {
            this._showInputError(editItem, editItem.validationMessage)
        } else {
            this._hideInputError(editItem)
        }
    }

    _setEventListeners() {
        this._toggleButtonState();
        this._editList.forEach((editItem) => {
            editItem.addEventListener('input', () => {
                this._checkInputValidity(editItem)
                this._toggleButtonState();
            })

        })
    }

}