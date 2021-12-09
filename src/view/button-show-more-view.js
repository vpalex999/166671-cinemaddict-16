import { AbstractView } from './abstract-view';

const createButtonShowMoreTemplate = () => '<button class="films-list__show-more">Show more</button>';

class ShowMoreButton extends AbstractView {

  get template() {
    return createButtonShowMoreTemplate();
  }
}

export { ShowMoreButton };
