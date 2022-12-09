export default class MenuItem {
  constructor(item, id, itemSelector, elementTemplateSelector) {
    this._item = item;
    this._id = id;
    this._itemSelector = itemSelector;
    this._elementTemplateSelector = elementTemplateSelector;
  }

  _getElementItem() {
    const elementTemplate = document.querySelector(this._elementTemplateSelector).content;
    const elementItem = elementTemplate.querySelector(this._itemSelector).cloneNode(true);

    return elementItem;
  }

  generateElementCard() {
    this._element = this._getElementItem();
    this._elementLink = this._element.querySelector('.menu__link');

    this._elementLink.textContent = this._item;
    if (this._id === 0) this._element.classList.add('menu__link_active');

    return this._element;
  }

}
