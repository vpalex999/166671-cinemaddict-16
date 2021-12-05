import { createElement } from '../render';

const createLoadingTemplate = () => '<h2 class="films-list__title">Loading...</h2>';

class Loading {
  #element = null;

  get template() {
    return createLoadingTemplate();
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

export { Loading };
