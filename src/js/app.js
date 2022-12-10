import * as utils from './modules/utils.js';
import Section from './components/Section.js';
import MenuItem from './components/MenuItem.js';
import Popup from './components/Popup.js';
import CityItem from './components/CityItem.js';
import { getCityList } from './modules/api.js';

import {
  menuList,
  itemMenuSelector,
  menuSelector,
  templateMenuItemSelector,
  location,
  popupLocationSelector,
  preloader,
  itemCitySelector,
  templateCityListSelector,
  cityListSelector,
} from './modules/constants.js';

// сжимаем изображения
utils.isWebp();

// выводим меню
const createMenu = (data) => {
  const menu = new Section(
    {
      items: data,
      renderer: (item) => {
        const elementItem = new MenuItem(
          item,
          data.indexOf(item),
          itemMenuSelector,
          templateMenuItemSelector,
        );

        return elementItem.generateElementCard();
      },
    },
    menuSelector,
  );
  menu.renderItems();

  return menu;
}
createMenu(menuList);

// функционал выбора города
const popupLocation = new Popup(popupLocationSelector);
const cityList = [];
let isLoading = false;

const createCityList = (data) => {
  const cities = new Section(
    {
      items: data,
      renderer: (item) => {
        const elementItem = new CityItem(
          item,
          itemCitySelector,
          templateCityListSelector,
        );

        return elementItem.generateElementItem();
      },
    },
    cityListSelector,
  );
  cities.renderItems();

  return cities;
}

location.addEventListener('click', () => {
  if (!isLoading) preloader.classList.add('preloader_visible');
  popupLocation.open();
  popupLocation.setEventListeners();
  if (cityList.length === 0) {
    getCityList()
      .then(res => {
        res.forEach(el => {
          cityList.push({ name: el.name, type: el.type, id: el.id });
          if (el.cities) el.cities.forEach(city => cityList.push(city));
        });
        isLoading = true;
        preloader.classList.remove('preloader_visible');
        createCityList(cityList);
      })
      .catch(err => console.log(err));
  }
});




