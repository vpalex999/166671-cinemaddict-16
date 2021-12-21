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

const createFilterItemTemplate = ({ name, count }) => {
  const { hrefName, displayName } = filterItemName[name];

  return `<a href=${hrefName}
       class="main-navigation__item">${displayName}
       <span class="main-navigation__item-count">${count}</span>
    </a>`;
};

const createAllMoviesTemplate = () =>
  '<a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>';

const createFilterTemplate = (filters = BLANK_FILTERS) => {

  const filterItemsTemplate = filters
    .map((filter) => createFilterItemTemplate(filter))
    .join('');

  return `<div class="main-navigation__items">
      ${createAllMoviesTemplate()}
      ${filterItemsTemplate}
    </div>`;
};

class Filter extends AbstractView {
  #filters = null;

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFilterTemplate(this.#filters);
  }
}

export { Filter };
