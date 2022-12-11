export default class Popup {
  constructor(popupSelector, getActivCity) {
    this._elementPopup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._buttonSave = this._elementPopup.querySelector('.popup__button');
    this._getActivCity = getActivCity;
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
    const activeCities = this._getActivCity()

    activeCities.length ? this._buttonSave.classList.add('popup__button_active')
      : this._buttonSave.classList.remove('popup__button_active');
  }

  setEventListeners() {
    this._elementPopup.addEventListener('click', evt => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close();
      }
    });

    this._buttonSave.addEventListener('click', () => {

    });
  }
}
