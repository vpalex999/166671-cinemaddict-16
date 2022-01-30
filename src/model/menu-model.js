import { MenuItem } from '../const';
import { AbstractObservable } from '../utils/abstract-observable';

class MenuModel extends AbstractObservable {
  #menu = MenuItem.FILTERS;

  get menu() {
    return this.#menu;
  }

  updateMenu = (menuItem) => {
    this.#menu =menuItem;

    this._notify(this.#menu);
  };
}

export { MenuModel };
