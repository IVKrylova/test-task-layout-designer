export default class SearchForm {
  constructor(formSelector, data, getFoundCities) {
    this._formSelector = formSelector;
    this._form = document.querySelector(this._formSelector);
    this._input = this._form.querySelector('.form-search-city__input');
    this._buttonReset = this._form.querySelector('.form-search-city__button-reset');
    this._data = data;
    this._getFoundCities = getFoundCities;
  }

  setEventListener() {
    this._input.addEventListener('input', () => {
      if (this._input.value) {
        this._buttonReset.classList.add('form-search-city__button-reset_visible');
        const value = this._input.value.toLowerCase();
        this._foundCities = this._data.filter(el => el.name.toLowerCase().includes(value))
        this._getFoundCities(this._foundCities, this._input.value);
      } else {
        this._buttonReset.classList.remove('form-search-city__button-reset_visible');
        this._foundCities = this._data;
        this._getFoundCities(this._foundCities, '');
      }
    });

    this._buttonReset.addEventListener('click', () => {
      this._form.reset();
      this._buttonReset.classList.remove('form-search-city__button-reset_visible');
      this._foundCities = this._data;
      this._getFoundCities(this._foundCities, '');
    });
  }
}
