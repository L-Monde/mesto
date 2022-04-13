export class UserInfo {
    constructor({ nameSelector, descriptionSelector }) {
        this._name = document.querySelector(nameSelector)
        this._info = document.querySelector(descriptionSelector)
    }
    getUserInfo() {
        return {
            name: this._name.textContent,
            info: this._info.textContent
        }
    }
    setUserInfo(name, info) {
        this._name.textContent = name
        this._info.textContent = info
    }
}
/*
function copyProfilePopup() {
    formName.value = this._name.textContent;
    formDesc.value = this._info.textContent;
}
const formName = document.querySelector('.popup__edit_type_name');
const formDesc = document.querySelector('.popup__edit_type_description');
*/