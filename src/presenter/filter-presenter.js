import { FilterName, UpdateType } from '../const';
import { remove, render, RenderPosition, replace } from '../utils/render';
import { Filter } from '../view/filter-view';
import { filter } from '../utils/filter';


class FilterPresenter {
  #filterContainer = null;
  #filterComponent = null;
  #filterModel = null;
  #filmsModel = null;

  constructor(mainContainer, filterModel, filmsModel) {
    this.#filterContainer = mainContainer;
    this.#filterModel = filterModel;
    this.#filmsModel = filmsModel;

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

  #onModelEvent = () => {
    this.init();
  };

  #onViewAction = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.updateFilter(UpdateType.MAJOR, filterType);
  };
}

export { FilterPresenter };
