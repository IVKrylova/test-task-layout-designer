export default class Popup {
  constructor(popupSelector, getActivCity, handleButtonSave) {
    this._elementPopup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._buttonSave = this._elementPopup.querySelector('.popup__button');
    this._getActivCity = getActivCity;
    this._handleButtonSave = handleButtonSave;
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  open() {
    this._elementPopup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._elementPopup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  getStateButtonSave() {
    const activeCities = this._getActivCity();

    if (activeCities.length) {
      this._buttonSave.classList.add('popup__button_active');
      this._buttonSave.removeAttribute('disabled');
    } else {
      this._buttonSave.classList.remove('popup__button_active');
      this._buttonSave.setAttribute('disabled', true);
    }
  }

  setEventListeners() {
    this._elementPopup.addEventListener('click', evt => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close();
      }
    });

    this._buttonSave.addEventListener('click', () => {
      const activeCities = [];

      this._getActivCity().forEach(el => activeCities.push(el.textContent));
      this._handleButtonSave(activeCities);
    });
  }
}
