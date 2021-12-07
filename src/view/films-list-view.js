import { createElement } from '../render';

const createFilmListTemplate = () => '<section class="films-list"></section>';

class FilmList {
  #element = null;

  get template() {
    return createFilmListTemplate();
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
