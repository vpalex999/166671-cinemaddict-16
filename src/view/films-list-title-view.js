import { AbstractView } from './abstract-view';
import { FilterName } from '../const';

const ALL_MOVIES_UPCOMING = 'All movies. Upcoming';

const NoFilmsTextType = {
  [FilterName.ALL]: 'There are no movies in our database',
  [FilterName.WATCH_LIST]: 'There are no movies to watch now',
  [FilterName.HISTORY]: 'There are no watched movies now',
  [FilterName.FAVORITES]: 'There are no favorite movies now',
};

const createFilmsListTitleTemplate = (filmTitle) => (`<h2 class="films-list__title">${filmTitle}</h2>`);


class FilmsListTitle extends AbstractView {
  #noFilmsFilterType = null;

  constructor(noFilmsFilterType) {
    super();
    this.#noFilmsFilterType = noFilmsFilterType;
  }

  get template() {
    const filmTitle = this.#noFilmsFilterType ? NoFilmsTextType[this.#noFilmsFilterType] : ALL_MOVIES_UPCOMING;

    return createFilmsListTitleTemplate(filmTitle);
  }
}

export { FilmsListTitle };
