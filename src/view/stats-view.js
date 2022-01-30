import { AbstractView } from './abstract-view';
import { MenuItem } from '../const';

const CLASS_ACTIVE_BUTTON= 'main-navigation__additional--active';

const createStatsTemplate = () => '<a href="#stats" class="main-navigation__additional">Stats</a>';

class StatsMenuView extends AbstractView {

  get template() {
    return createStatsTemplate();
  }

  active = () => {
    this.element.classList.add(CLASS_ACTIVE_BUTTON);
  };

  inactive = () => {
    this.element.classList.remove(CLASS_ACTIVE_BUTTON);
  };

  #onMenuClick = (evt) => {
    evt.preventDefault();

    if (evt.target.tagName === 'A') {
      this._callback.menuClick(MenuItem.STATISTICS);
    }
  };

  setMenuClickHandler = (callback) => {
    this._callback.menuClick = callback;
    this.element.addEventListener('click', this.#onMenuClick);
  };
}

export { StatsMenuView };
