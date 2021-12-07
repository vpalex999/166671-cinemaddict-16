import { createElement } from './render';

class Abstract {
  #element = null;

  constructor() {
    if (new.target === Abstract) {
      throw new Error('Can\'t instantiate AbstractView, only concrete one.');
    }
  }

  get template() {
    throw new Error('Absctract method not implemented: get template');
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

export { Abstract };
