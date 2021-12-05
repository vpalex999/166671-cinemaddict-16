import { createElement } from '../render';

const createButtonShowMoreTemplate = () => '<button class="films-list__show-more">Show more</button>';

class ShowMoreButton {
  #element = null;

  get template() {
    return createButtonShowMoreTemplate();
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

export { createButtonShowMoreTemplate, ShowMoreButton };
