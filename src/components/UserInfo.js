export class UserInfo {
    constructor({ nameSelector, descriptionSelector, avatarSelector }) {
        this._name = document.querySelector(nameSelector)
        this._info = document.querySelector(descriptionSelector)
        this._avatar = document.querySelector(avatarSelector);
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
    setAvatar(avatar) {
        this._avatar.src = avatar
    }
}