import { AbstractView } from './abstract-view';

const createNavigationTemplate = () => '<nav class="main-navigation"></nav>';

class NavigationView extends AbstractView {

  get template() {
    return createNavigationTemplate();
  }
}

export { NavigationView };
