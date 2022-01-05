import { remove, render, RenderPosition, replace } from '../utils/render';
import { Filter } from '../view/filter-view';


class FilterPresenter {
  #filterContainer = null;
  #filterComponent = null;
  #filters = null;

  constructor(mainContainer) {
    this.#filterContainer = mainContainer;
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
}


export { FilterPresenter };
