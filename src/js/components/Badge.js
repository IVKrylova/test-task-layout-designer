export default class Badge {
  constructor(item, deleteBadge, checkClassActivCity, badgeSelector, elementTemplateSelector) {
    this._item = item;
    this._deleteBadge = deleteBadge;
    this._checkClassActivCity = checkClassActivCity;
    this._badgeSelector = badgeSelector;
    this._elementTemplateSelector = elementTemplateSelector;
  }

  _getElementBadge() {
    const elementTemplate = document.querySelector(this._elementTemplateSelector).content;
    const badge = elementTemplate.querySelector(this._badgeSelector).cloneNode(true);

    return badge;
  }

  _setEventListeners() {
    this._buttonClose.addEventListener('click', () => {
      this._deleteBadge(this._item);
      this._checkClassActivCity(this._item);
    });
  }

  generateBadge() {
    this._element = this._getElementBadge();
    this._elementText = this._element.querySelector('.badge__text');
    this._buttonClose = this._element.querySelector('.badge__button-delete');

    this._elementText.textContent = this._item;
    this._setEventListeners();

    return this._element;
  }
}
