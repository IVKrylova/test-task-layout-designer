export default class CityItem {
  constructor(item, value, areaList, handleAddBadge, handleDeleteBadge, badges, itemSelector, elementTemplateSelector) {
    this._itemSelector = itemSelector;
    this._elementTemplateSelector = elementTemplateSelector;
    this._name = item.name;
    this._id = item.id;
    this._stateId = item.state_id;
    this._string = value;
    this._areaList = areaList;
    this._handleAddBadge = handleAddBadge;
    this._handleDeletBadge = handleDeleteBadge;
    this._badges = badges;
  }

  _getElementItem() {
    const elementTemplate = document.querySelector(this._elementTemplateSelector).content;
    const elementItem = elementTemplate.querySelector(this._itemSelector).cloneNode(true);

    return elementItem;
  }

  _setEvantListeners() {
    this._element.addEventListener('click', () => {
      if (this._element.closest('.popup__city-item_active')) {
        this._element.classList.remove('popup__city-item_active');
        this._handleDeletBadge(this._name);
      } else {
        this._element.classList.add('popup__city-item_active');
        this._handleAddBadge(this._name);
      }
    });
  }

  generateElementItem() {
    this._element = this._getElementItem();

    if (!this._string) this._element.textContent = this._name;
    if (this._string) {
      const string = this._string.toLowerCase();
      const name = this._name.toLowerCase();
      const parts = name.split(string);

      // добавляем цвет буквам
      const text = parts.join(`<span class="popup__cityString">${string}</span>`);
      // добавляем заглавную букву после -
      const textWithHyperhen = text.split('-')
        .map((el, index) => {
          if (index > 0) return el.replace(el[0], el[0].toUpperCase());
          if (index === 0) return el;
        }).join('-');
      // заменяем -На- => -на-
      const newName = textWithHyperhen.replace('-На-', '-на-');
      // добавляем заглавную букву в начале слова
      const upperText = name.indexOf(string) === 0
        ? `${newName.slice(0, 32)}${newName[32].toUpperCase()}${newName.slice(33)}`
        : `${newName[0].toUpperCase()}${newName.slice(1)}`;
      // добавляем заглавную букву после пробела
      const index = upperText.indexOf(' <') + 33;
      const newText = upperText.indexOf(' <') === -1
        ? upperText
        : `${upperText.slice(0, index)}${upperText[index].toUpperCase()}${upperText.slice(index + 1)}`;
      // добавляем регион
      if (this._stateId) {
        let area;
        this._areaList.forEach(el => {
          if (el.id === this._stateId) area = el.name;
          return;
        });
        const textWithArea = `${newText}<span class="popup__city-area">${area}</span>`
        this._element.innerHTML = textWithArea;
      } else {
        this._element.innerHTML = newText;
      }
    }

    // добавляем выделение выбранным городам
    this._badges.forEach(name => {
      if (name === this._name) this._element.classList.add('popup__city-item_active');
    });

    this._setEvantListeners();

    return this._element;
  }
}
