export default class CityItem {
  constructor(item, value, itemSelector, elementTemplateSelector) {
    this._itemSelector = itemSelector;
    this._elementTemplateSelector = elementTemplateSelector;
    this._name = item.name;
    this._id = item.id;
    this._stateId = item.state_id;
    this._string = value;
  }

  _getElementItem() {
    const elementTemplate = document.querySelector(this._elementTemplateSelector).content;
    const elementItem = elementTemplate.querySelector(this._itemSelector).cloneNode(true);

    return elementItem;
  }

  generateElementItem() {
    this._element = this._getElementItem();

    if (!this._string) this._element.textContent = this._name;
    if (this._string) {
      const string = this._string.toLowerCase();
      const name = this._name.toLowerCase();
      const parts = name.split(string);
      // добавляем цвет буквам
      const text = parts.join(`<span class="popup__city-string">${string}</span>`);
      // добавляем заглавную букву в начале слова
      const upperText = name.indexOf(string) === 0
        ? `${text.slice(0, 33)}${text[33].toUpperCase()}${text.slice(34)}`
        : `${text[0].toUpperCase()}${text.slice(1)}`;
      // добавляем заглавную букву после пробела
      const index = upperText.indexOf(' <') + 34;
      const newText = upperText.indexOf(' <') === -1
        ? upperText
        : `${upperText.slice(0, index)}${upperText[index].toUpperCase()}${upperText.slice(index + 1)}`
      this._element.innerHTML = newText;
    }

    return this._element;
  }
}
