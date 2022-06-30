class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    //card manipulation methods
    getCardsArray() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers,
        }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
    }
    addNewCard(name, link) {
        return fetch(`${this._url}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name,
                link,
            }),
        }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
    }
    deleteCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
            method: "DELETE",
            headers: this._headers,
        }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
    }

    //profile edition methods
    getProfileInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers,
        }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
    }
    changeProfileInfo(name, about) {
        return fetch(`${this._url}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name,
                about,
            }),
        }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
    }
    getProfileAvatar() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers,
        }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
    }

    changeProfileAvatar(avatar) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar
            })
        })
    }


    //like counter methods
    addCardLike(id) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: "PUT",
            headers: this._headers,
        }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
    }
    removeCardLike(id) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: "DELETE",
            headers: this._headers,
        }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
    }
}

export const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-40',
    headers: {
        authorization: 'f6e30d96-a451-4ec9-81ba-5b034a8c8256',
        'Content-Type': 'application/json'
    }
});