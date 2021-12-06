import { createElement } from '../render';

const createFilmsListTitleTemplate = (count = 0) => (
  `<h2 class="films-list__title">${count > 0
    ? 'All movies. Upcoming'
    : 'There are no movies in our database'
  }</h2>`);

class FilmsListTitle {
  #element = null;
  #count = null;

  constructor(count) {
    this.#count = count;
  }

  get template() {
    return createFilmsListTitleTemplate(this.#count);
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

export { FilmsListTitle };
