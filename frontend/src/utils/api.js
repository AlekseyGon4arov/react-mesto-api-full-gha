class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
    this.addLike = this.addLike.bind(this);
    this.deleteLike = this.deleteLike.bind(this);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getProfileData() {
    const token = localStorage.getItem('jwt');

    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
    .then(this._checkResponse)
  }

  setProfileData(data) {
    const token = localStorage.getItem('jwt');

    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(this._checkResponse)
  }

  getInitialCards() {
    const token = localStorage.getItem('jwt');

    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
    .then(this._checkResponse)
  }

  createCard(data) {
    const token = localStorage.getItem('jwt');

    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(this._checkResponse)
  }

  deleteCard(_id) {
    const token = localStorage.getItem('jwt');

    return fetch(`${this._baseUrl}/cards/${_id}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then(this._checkResponse)
  }

  addLike(_id) {
    const token = localStorage.getItem('jwt');

    return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
    .then(this._checkResponse)
  }

  deleteLike(_id) {
    const token = localStorage.getItem('jwt');

    return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
    .then(this._checkResponse)
  }

  updateAvatar(data) {
    const token = localStorage.getItem('jwt');

    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(this._checkResponse)
  }
}

const api = new Api({
  baseUrl: 'https://api.mesto.goncharov.nomoredomains.rocks',
});

export default api;