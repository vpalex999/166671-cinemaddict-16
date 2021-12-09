import { AbstractView } from './abstract-view';

const createFilmsTemplate = () => '<section class="films"></section>';

class Films extends AbstractView {

  get template() {
    return createFilmsTemplate();
  }
}

export { Films };
