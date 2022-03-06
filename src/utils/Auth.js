const BASE_URL = 'https://api.idoslivko-news-explorer.students.nomoreparties.sbs';

const invalidField = 'Incorrect email or password';
const missingToken = 'Token not provided or provided in the wrong format';
const registerReject = 'One of the fields was filled in incorrectly';
const conflict = 'This email is not available';

function checkResponse(res, error1, error2) {
	if (res.status === 400) { throw new Error(`400 - ${error1}`); }
	else if (res.status === 401) { throw new Error(`401 - ${error1}`); }
	else if (res.status === 409) { throw new Error(`409 - ${error2}`); }
	else if (!res.ok) { throw new Error('500 - Internal Server Error'); }
	else { return res.json(); }
}

export function register({ email, password, name }) {
	return fetch(`${BASE_URL}/signup`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ email, password, name })
	})
	.then(res => checkResponse(res, registerReject, conflict))
}

export function authorize({ email, password }) {
	return fetch(`${BASE_URL}/signin`, {
		method: 'POST',
    headers: {
			'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
	.then(res => checkResponse(res, invalidField))
}

export function checkToken(token) {
  return fetch(`${BASE_URL}/users/me`, {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		}
	})
	.then(res => checkResponse(res, missingToken))
}
