class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.statusText);
    }
  }

  showSavedCards() {
    return fetch(`${this._baseUrl}/articles`, {
      method: 'GET',
      headers: this._headers,
    })
    .then((res) => this._checkResponse(res))
  }

  saveArticleToAccount(card, searchKeyword) {
    return fetch(`${this._baseUrl}/articles`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        keyword: searchKeyword,
        title: card.title,
        text: card.description,
        date: card.publishedAt,
        source: card.source.name,
        link: card.url,
        image: card.urlToImage,
      }),
    })
    .then((res) => this._checkResponse(res))
  }

  deleteArticleFromAccount(cardId) {
    return fetch(`${this._baseUrl}/articles/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then((res) => this._checkResponse(res))
  }

}

const mainApi = new MainApi({
  baseUrl: "https://api.idoslivko-news-explorer.students.nomoreparties.sbs",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.token}`,
  },
});

export default mainApi;
