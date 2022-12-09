import * as utils from './modules/utils.js';
import Section from './components/Section.js';
import MenuItem from './components/MenuItem.js';
import Popup from './components/Popup.js';

import {
  menuList,
  itemMenuSelector,
  menuSelector,
  templateMenuItemSelector,
  location,
  popupLocationSelector,
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

location.addEventListener('click', () => {
  popupLocation.open();
  popupLocation.setEventListeners();
});
