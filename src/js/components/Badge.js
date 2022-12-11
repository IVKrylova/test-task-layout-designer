export default class Badge {
  constructor(item, badgeSelector, elementTemplateSelector) {
    this._item = item;
    this._badgeSelector = badgeSelector;
    this._elementTemplateSelector = elementTemplateSelector;
  }

  _getElementBadge() {
    const elementTemplate = document.querySelector(this._elementTemplateSelector).content;
    const badge = elementTemplate.querySelector(this._badgeSelector).cloneNode(true);

    return badge;
  }

  generateBadge() {
    this._element = this._getElementBadge();
    this._elementText = this._element.querySelector('.badge__text');

    this._elementText.textContent = this._item;

    return this._element;
  }
}
