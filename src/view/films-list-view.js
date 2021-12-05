import { createElement } from '../render';

const createFilmListTemplate = (films = []) => (
  `<section class="films-list">
    <h2 class="films-list__title">
    ${films.length > 0
    ? ''
    : 'There are no movies in our database'
  }
  </h2>
  </section>`
);

class FilmList {
  #element = null;
  #films = null;

  constructor(films) {
    this.#films = films;
  }

  get template() {
    return createFilmListTemplate(this.#films);
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

export { FilmList };
