import { AbstractView } from './abstract-view';
import { SortType } from '../const';

const SORT_ACTIVE_CLASS = 'sort__button--active';

const createSortFilmsTemplate = () => (
  `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${SortType.DATE}">Sort by date</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${SortType.RATING}">Sort by rating</a></li>
  </ul>`
);

class SortFilms extends AbstractView {

  get template() {
    return createSortFilmsTemplate();
  }

  #onSortTypeChangeClick = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();

    const buttonsElement = this.element.querySelectorAll('.sort__button--active');

    for (const element of buttonsElement) {
      if (element.classList.contains(SORT_ACTIVE_CLASS)) {
        element.classList.remove(SORT_ACTIVE_CLASS);
      }
    }

    evt.target.classList.add(SORT_ACTIVE_CLASS);
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  };

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#onSortTypeChangeClick);
  };
}

export { SortFilms };
