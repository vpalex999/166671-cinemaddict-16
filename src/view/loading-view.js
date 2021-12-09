import { AbstractView } from './abstract-view';

const createLoadingTemplate = () => '<h2 class="films-list__title">Loading...</h2>';

class Loading extends AbstractView {

  get template() {
    return createLoadingTemplate();
  }
}

export { Loading };
