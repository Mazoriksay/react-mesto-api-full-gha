class Auth {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _checkStatus(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    _request(url, options) {
        return fetch(this._baseUrl + url, options).then(this._checkStatus);
    }

    checkToken(token) {
        return this._request(`/users/me`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                ...this._headers,
            }
        });
    }

    register({email, password}) {
        return this._request('/signup', {
            method: 'POST',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({email, password}) 
        });
    }

    authorize({email, password}) {
        return this._request('/signin', {
            method: 'POST',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({email, password}) 
        })
        .then((data) => {
            localStorage.setItem('userId', data._id); 
        })
    }
}

export const auth = new Auth({
    baseUrl: 'https://api.mesto-skifenok.nomoreparties.co',
    headers: {
        'Content-Type': 'application/json',
    }
});