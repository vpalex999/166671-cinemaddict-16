import { AbstractView } from './abstract-view';

const createButtonShowMoreTemplate = () => '<button class="films-list__show-more">Show more</button>';

class ShowMoreButton extends AbstractView {

  get template() {
    return createButtonShowMoreTemplate();
  }

  #onShowNext = (evt) => {
    evt.preventDefault();
    this._callback.clickShowNext();
  };

  setClickHandler = (callback) => {
    this._callback.clickShowNext = callback;
    this.element
      .addEventListener('click', this.#onShowNext);
  };
}

export { ShowMoreButton };
