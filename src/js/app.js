import * as utils from './modules/utils.js';
import Section from './components/Section.js';
import MenuItem from './components/MenuItem.js';
import Popup from './components/Popup.js';
import CityItem from './components/CityItem.js';
import SearchForm from './components/SearchForm.js';
import Badge from './components/Badge.js';
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
  formSearchCitySelector,
  cityListElement,
  badgeSelector,
  templateBadgeSelector,
  badgesListSelector,
  badgesListElement,
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

// функционал бейджей
const badges = [];

const createBadgesList = (data) => {
  const badges = new Section(
    {
      items: data,
      renderer: (item) => {
        const elementItem = new Badge(
          item,
          badgeSelector,
          templateBadgeSelector,
        );

        return elementItem.generateBadge();
      },
    },
    badgesListSelector,
  );
  badges.renderItems();

  return badges;
}

const addBadge = city => {
  if (city) badges.push(city);
  badgesListElement.textContent = '';
  createBadgesList(badges);
}

const deletBadge = city => {
  if (city) {
    const index = badges.indexOf(city);

    if(badges.length === 1) {
      badges.pop();
    } else if (index === 0) {
      badges.shift();
    } else {
      badges.splice(index, index);
    }
  };
  badgesListElement.textContent = '';
  createBadgesList(badges);
}

addBadge();
deletBadge();

// рендер списка городов
const popupLocation = new Popup(popupLocationSelector);
const cityList = [];
const areaList = [];
let isLoading = false;

const createCityList = (data, value) => {
  const cities = new Section(
    {
      items: data,
      renderer: (item) => {
        const elementItem = new CityItem(
          item,
          value,
          areaList,
          addBadge,
          deletBadge,
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
          if (el.cities) {
            el.cities.forEach(city => cityList.push(city));
            areaList.push({ name: el.name, id: el.id });
          }
        });
        isLoading = true;
        preloader.classList.remove('preloader_visible');
        createCityList(cityList);
      })
      .catch(err => console.log(err));
  }
});

const getSearchCities = (searchCities, value) => {
  if (searchCities) {
    cityListElement.textContent = '';
    createCityList(searchCities, value);
  }
}

// поиск по городам
const searchCityForm = new SearchForm(formSearchCitySelector, cityList, getSearchCities);
searchCityForm.setEventListener();
getSearchCities();
