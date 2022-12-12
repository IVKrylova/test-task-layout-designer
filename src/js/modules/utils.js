export const isWebp = () => {
  function testWebP(callback) {
    const webP = new Image();
    webP.onload = webP.onerror = function() {
      callback(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  }

  testWebP(function(support) {
    const className = support === true ? 'webp' : 'no-webp';
    document.documentElement.classList.add(className);
  });
}

export const getCityName = elementCity => {
  const city = elementCity.textContent;
  const area = elementCity.querySelector('.popup__city-area');
  let name;

  if (area) {
    const textArea = area.textContent;
    const index = city.indexOf(textArea);
    name = city.slice(0, index);
  }

  return name;
}
