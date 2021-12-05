import { createElement } from '../render';

const createStatsTemplate = () => '<a href="#stats" class="main-navigation__additional">Stats</a>';

class Stats {
  #element = null;

  get template() {
    return createStatsTemplate();
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
export { createStatsTemplate, Stats };
