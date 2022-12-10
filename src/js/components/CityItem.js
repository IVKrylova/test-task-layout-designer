export default class CityItem {
  constructor(item, itemSelector, elementTemplateSelector) {
    this._itemSelector = itemSelector;
    this._elementTemplateSelector = elementTemplateSelector;
    this._name = item.name;
    this._id = item.id;
    this._stateId = item.state_id;
  }

  _getElementItem() {
    const elementTemplate = document.querySelector(this._elementTemplateSelector).content;
    const elementItem = elementTemplate.querySelector(this._itemSelector).cloneNode(true);

    return elementItem;
  }

  generateElementItem() {
    this._element = this._getElementItem();

    this._element.textContent = this._name;

    return this._element;
  }
}
