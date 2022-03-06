class NewsApi {
  constructor({ baseUrl, from, to }) {
    this._baseUrl = baseUrl;
		this._from = from;
		this._to = to;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.statusText);
    }
  }

  getArticles(keyword) {
    return fetch(`${this._baseUrl}?apiKey=${API_KEY}&q=${keyword}&from=${from}&to=${to}&pageSize=100`)
    .then((res) => this._checkResponse(res))
  }

}

const API_KEY = '9db97a04f2c84cd1976ace8e7b723ffc';
const week = 24 * 60 * 60 * 1000 * 7;
const to = new Date().toISOString();
const from = new Date(Date.now() - week).toISOString();

const newsApi = new NewsApi({
  baseUrl: "https://nomoreparties.co/news/v2/everything",
	from,
	to,
});

export default newsApi;
