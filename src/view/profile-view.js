import { createElement } from '../render';

const createProfileTemplate = (profile) => {
  if (profile) {
    const { rating, avatar } = profile;

    return `<section class="header__profile profile">
    <p class="profile__rating">${rating}</p>
    <img class="profile__avatar" src=${avatar} alt="Avatar" width="35" height="35">
    </section>`;
  }
  return '';
};

class Profile {
  #element = null;
  #profile = null;

  constructor(profile) {
    this.#profile = profile;
  }

  get template() {
    return createProfileTemplate(this.#profile);
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

export { createProfileTemplate, Profile };
