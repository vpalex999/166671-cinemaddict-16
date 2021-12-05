import { createElement } from '../render';
import { FILTER_NAME } from '../const';

const BLANK_FILTERS = [
  {
    name: FILTER_NAME.WATCH_LIST,
    count: 0
  },
  {
    name: FILTER_NAME.HISTORY,
    count: 0
  },
  {
    name: FILTER_NAME.FAVORITES,
    count: 0
  }
];

const filterItemName = {
  [FILTER_NAME.WATCH_LIST]: {
    hrefName: '#watchlist',
    displayName: 'Watchlist'
  },
  [FILTER_NAME.HISTORY]: {
    hrefName: '#history',
    displayName: 'History'
  },
  [FILTER_NAME.FAVORITES]: {
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

class Filter {
  #element = null;
  #filters = null;

  constructor(filters) {
    this.#filters = filters;
  }

  get template() {
    return createFilterTemplate(this.#filters);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}

export { createFilterTemplate, Filter };
