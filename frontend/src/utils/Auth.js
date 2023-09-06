import getToken from './constants'

class Auth {
  constructor(baseUrl) {
    this._url = baseUrl;
  }

  _checkResponse(res) {
    console.log(res)
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ой ${res.status}`);
  }

  register(email, password) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    }
    )
      .then((res) => {
        return this._checkResponse(res);
      })
  }

  authorize(email, password) {
    const url = `${this._url}/signin`;
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    }
    )
      .then(res => {
        return this._checkResponse(res);
      });
  }

  getContent() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        Authorization: getToken(),
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        return this._checkResponse(res);
      });
  }
}
//const auth = new Auth('http://127.0.0.1:4000');
const auth = new Auth('http://api.mesto.o4ico.nomoredomainsicu.ru');

export default auth;