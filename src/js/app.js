import * as utils from './modules/utils.js';
import Section from './components/Section.js';
import MenuItem from './components/MenuItem.js';
import Popup from './components/Popup.js';
import { getCityList } from './modules/api.js';

import {
  menuList,
  itemMenuSelector,
  menuSelector,
  templateMenuItemSelector,
  location,
  popupLocationSelector,
  preloader,
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

location.addEventListener('click', () => {
  if (!isLoading) preloader.classList.add('preloader_visible');
  popupLocation.open();
  popupLocation.setEventListeners();
  if (cityList.length === 0) {
    getCityList()
      .then(res => {
        res.forEach(el => cityList.push(el));
        isLoading = true;
        preloader.classList.remove('preloader_visible');
        console.log(cityList)
      })
      .catch(err => console.log(err));
  }
});




