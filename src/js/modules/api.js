const checkResponse = res => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const getCityList = () => {
  return fetch(`https://studika.ru/api/areas`, {
    method: 'POST',
  })
    .then(checkResponse)
}

export const sendActiveCities = cities => {
  // отправка данных на сервер
  /* return fetch(`https://studika.ru/api/areas`, {
    method: 'POST',
    headers: {
      authorization: this.authorization,
      'Content-Type': this.contentType
    },
    body: JSON.stringify({
      cities: cities,
    })
  })
  .then(this._checkResponse)  */

  console.log(cities);
}
