import { AbstractView } from './abstract-view';

const createFilmsListTitleTemplate = (count = 0) => (
  `<h2 class="films-list__title">${count > 0
    ? 'All movies. Upcoming'
    : 'There are no movies in our database'
  }</h2>`);

class FilmsListTitle extends AbstractView {
  #count = null;

  constructor(count) {
    super();
    this.#count = count;
  }

  get template() {
    return createFilmsListTitleTemplate(this.#count);
  }
}

export { FilmsListTitle };
