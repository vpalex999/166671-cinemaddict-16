import { AbstractView } from './abstract-view';
import { FilterName } from '../const';

const BLANK_FILTERS = [
  {
    name: FilterName.WATCH_LIST,
    count: 0
  },
  {
    name: FilterName.HISTORY,
    count: 0
  },
  {
    name: FilterName.FAVORITES,
    count: 0
  }
];

const ACTIVE_FILTER_CLASS = 'main-navigation__item--active';

const filterItemName = {
  [FilterName.WATCH_LIST]: {
    hrefName: '#watchlist',
    displayName: 'Watchlist'
  },
  [FilterName.HISTORY]: {
    hrefName: '#history',
    displayName: 'History'
  },
  [FilterName.FAVORITES]: {
    hrefName: '#favorites',
    displayName: 'Favorites'
  }
};

const createFilterItemTemplate = (filter, currentFilter) => {
  const { name, count } = filter;

  if (name === FilterName.ALL) {
    return;
  }
  const { hrefName, displayName } = filterItemName[name];

  return `<a href=${hrefName}
       class="main-navigation__item ${currentFilter === displayName ? ACTIVE_FILTER_CLASS : ''}">${displayName}
       <span class="main-navigation__item-count">${count}</span>
    </a>`;
};

const createAllMoviesTemplate = (currentFilter) =>
  `<a href="#all" class="main-navigation__item ${currentFilter === FilterName.ALL ? ACTIVE_FILTER_CLASS : ''}">All movies</a>`;

const createFilterTemplate = (filters = BLANK_FILTERS, currentFilter) => {

  const filterItemsTemplate = filters
    .map((filter) => createFilterItemTemplate(filter, currentFilter))
    .join('');

  return `<div class="main-navigation__items">
      ${createAllMoviesTemplate(currentFilter)}
      ${filterItemsTemplate}
    </div>`;
};

class Filter extends AbstractView {
  #filters = null;
  #currentFilter = null;

  constructor(filters, currentFilter) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilter;
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilter);
  }

  setInactive = () => {
    // снимает с кнопок фильтров класс активности
    const filtersElement = this.element.querySelectorAll('a');
    filtersElement.forEach((filterElement) => {
      filterElement.classList.remove(ACTIVE_FILTER_CLASS);
    });
  };

  #onFilterTypeChange = (evt) => {
    evt.preventDefault();
    let filterType = null;

    if (evt.target.tagName === 'A') {
      [filterType] = evt.target.textContent.split('\n');
    } else if (evt.target.parentElement.tagName === 'A') {
      [filterType] = evt.target.parentElement.textContent.split('\n');
    }

    this._callback.filterTypeChange(filterType.trim());
  };

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('click', this.#onFilterTypeChange);
  };
}

export { Filter };
