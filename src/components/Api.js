class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    //card manipulation methods
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(res.status)
    }
    getCardsArray() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers,
        }).then(this._checkResponse);
    }
    addNewCard(name, link) {
        return fetch(`${this._url}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name,
                link,
            }),
        }).then(this._checkResponse);
    }
    deleteCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
            method: "DELETE",
            headers: this._headers,
        }).then(this._checkResponse);
    }

    //profile edition methods
    getProfileInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers,
        }).then(this._checkResponse);
    }
    changeProfileInfo(name, about) {
        return fetch(`${this._url}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name,
                about,
            }),
        }).then(this._checkResponse);
    }
    getProfileAvatar() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers,
        }).then(this._checkResponse);
    }

    changeProfileAvatar(avatar) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar
            })
        }).then(this._checkResponse);
    }


    //like counter methods
    addCardLike(id) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: "PUT",
            headers: this._headers,
        }).then(this._checkResponse);
    }
    removeCardLike(id) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: "DELETE",
            headers: this._headers,
        }).then(this._checkResponse);
    }
}

export const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-40',
    headers: {
        authorization: 'f6e30d96-a451-4ec9-81ba-5b034a8c8256',
        'Content-Type': 'application/json'
    }
});