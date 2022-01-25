import { FilterName, MenuItem, UpdateType } from '../const';
import { remove, render, RenderPosition, replace } from '../utils/render';
import { Filter } from '../view/filter-view';
import { filter } from '../utils/filter';


class FilterPresenter {
  #filterContainer = null;
  #filterComponent = null;
  #menuModel = null;
  #filterModel = null;
  #filmsModel = null;

  constructor(mainContainer, menuModel, filterModel, filmsModel) {
    this.#filterContainer = mainContainer;
    this.#menuModel = menuModel;
    this.#filterModel = filterModel;
    this.#filmsModel = filmsModel;

    this.#menuModel.addObserver(this.#onMemuModelEvent);
    this.#filterModel.addObserver(this.#onModelEvent);
    this.#filmsModel.addObserver(this.#onModelEvent);

  }

  get filters() {
    const films = this.#filmsModel.films;

    return [
      {
        name: FilterName.ALL,
        count: filter[FilterName.ALL](films).length,
      },
      {
        name: FilterName.WATCH_LIST,
        count: filter[FilterName.WATCH_LIST](films).length,
      },
      {
        name: FilterName.HISTORY,
        count: filter[FilterName.HISTORY](films).length,
      },
      {
        name: FilterName.FAVORITES,
        count: filter[FilterName.FAVORITES](films).length,
      },
    ];
  }

  init = () => {
    const filters = this.filters;

    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new Filter(filters, this.#filterModel.filter);
    this.#filterComponent.setFilterTypeChangeHandler(this.#onViewAction);

    if (prevFilterComponent === null) {
      render(this.#filterContainer, this.#filterComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  };

  #onMemuModelEvent = (menuItem) => {
    switch (menuItem){
      case MenuItem.STATISTICS:
        this.#filterComponent.setInactive();
        break;
    }
  };

  #onModelEvent = () => {
    this.init();
  };

  #onViewAction = (filterType) => {
    if (this.#menuModel.menu !== MenuItem.FILTERS){
      this.#menuModel.updateMenu(MenuItem.FILTERS);
      this.init();
    }

    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.updateFilter(UpdateType.MAJOR, filterType);
  };
}

export { FilterPresenter };
