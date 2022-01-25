import { MenuItem } from '../const';
import { render, RenderPosition } from '../utils/render';
import { NavigationView } from '../view/navigation-view';
import { StatsMenuView } from '../view/stats-view';
import { FilterPresenter } from './filter-presenter';


class NavigationPresenter{
  #mainContainer = null;
  #navigationComponent = null;
  #statisticMenuComponent = new StatsMenuView();
  #filterPresenter = null;
  #menuModel = null;
  #filterModel = null;
  #filmModel = null;

  constructor(mainContainer, menuModel, filterModel, filmModel){
    this.#mainContainer = mainContainer;
    this.#menuModel = menuModel;
    this.#filterModel = filterModel;
    this.#filmModel = filmModel;

  }

  init = () => {
    this.#menuModel.addObserver(this.#onModelEvent);
    this.#statisticMenuComponent.setMenuClickHandler(this.#onViewAction);

    if (this.#navigationComponent === null){
      this.#navigationComponent = new NavigationView();
      render(this.#mainContainer, this.#navigationComponent, RenderPosition.BEFOREEND);

      this.#filterPresenter = new FilterPresenter(this.#navigationComponent.element, this.#menuModel, this.#filterModel, this.#filmModel);
      this.#filterPresenter.init();

      render(this.#navigationComponent, this.#statisticMenuComponent, RenderPosition.BEFOREEND);
    }
  };

  #onModelEvent = (menuItem) => {
    switch (menuItem){
      case MenuItem.FILTERS:
        this.#statisticMenuComponent.inactive();
        break;
      case MenuItem.STATISTICS:
        this.#statisticMenuComponent.active();
        break;
    }
  };

  #onViewAction = (menuItem) => {
    this.#menuModel.updateMenu(menuItem);
  };

}

export { NavigationPresenter };
