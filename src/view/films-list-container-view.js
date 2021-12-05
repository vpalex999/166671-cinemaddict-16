import { createElement } from '../render';

const createFilmsListContainerTemplate = () => '<div class="films-list__container"></div>';

class FilmsListContainer {
  #element = null;

  get template() {
    return createFilmsListContainerTemplate();
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

export { createFilmsListContainerTemplate, FilmsListContainer };
