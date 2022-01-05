import { AbstractObservable } from '../utils/abstract-observable';
import { FilterName } from '../const';

class FilterModel extends AbstractObservable {
  #filter = FilterName.ALL;

  get filter() {
    return this.#filter;
  }

  updateFilter = (updateType, filter) => {
    this.#filter = filter;
    this._notify(updateType, filter);
  };
}

export { FilterModel };
