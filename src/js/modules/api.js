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
