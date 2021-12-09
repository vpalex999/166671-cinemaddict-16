import { AbstractView } from './abstract-view';

const createNavigationTemplate = () => '<nav class="main-navigation"></nav>';

class Navigation extends AbstractView {

  get template() {
    return createNavigationTemplate();
  }
}

export { Navigation };
