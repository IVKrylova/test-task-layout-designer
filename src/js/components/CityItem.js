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
      const i = name.indexOf(string);
      const j = i + string.length;
      let text;

      if (i === 0) {
        text = `<span class="popup__cityString">${string[0].toUpperCase()}${string.slice(1, j)}</span>${this._name.slice(j)}`;
      } else if ((name.indexOf('-') === i - 1) || (name.indexOf(' ') === i - 1)) {
        text = `${this._name.slice(0, i)}<span class="popup__cityString">${string[0].toUpperCase()}${string.slice(1, j)}</span>${this._name.slice(j)}`;
      } else {
        text = `${this._name.slice(0, i)}<span class="popup__cityString">${string}</span>${this._name.slice(j)}`;
      }
      // заменяем -На- => -на-
      const newName = text.replace('-<span class="popup__cityString">На</span>-', '-<span class="popup__cityString">на</span>-');

      // добавляем регион
      if (this._stateId) {
        let area;
        this._areaList.forEach(el => {
          if (el.id === this._stateId) area = el.name;
          return;
        });

        const textWithArea = `${newName}<span class="popup__city-area">${area}</span>`
        this._element.innerHTML = textWithArea;
      } else {
        this._element.innerHTML = newName;
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
