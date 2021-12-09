import { AbstractView } from './abstract-view';

const createSortFilmsTemplate = () => (
  `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" class="sort__button">Sort by date</a></li>
    <li><a href="#" class="sort__button">Sort by rating</a></li>
  </ul>`
);

class SortFilms extends AbstractView {

  get template() {
    return createSortFilmsTemplate();
  }
}

export { SortFilms };
