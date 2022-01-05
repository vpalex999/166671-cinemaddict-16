import { UpdateType } from '../const';
import { remove, render, RenderPosition, replace } from '../utils/render';
import { Filter } from '../view/filter-view';


class FilterPresenter {
  #filterContainer = null;
  #filterComponent = null;
  #filterModel = null;
  #filters = null;

  constructor(mainContainer, filterModel) {
    this.#filterContainer = mainContainer;
    this.#filterModel = filterModel;

  }

  init = (filters) => {
    this.#filters = filters;

    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new Filter(this.#filters);

    if (prevFilterComponent === null) {
      render(this.#filterContainer, this.#filterComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);

  };

  #onViewAction = (filter) => {
    if (this.#filterModel.filter === filter) {
      return;
    }

    this.#filterModel.updateFilter(UpdateType.MAJOR, filter);
  };
}

export { FilterPresenter };
