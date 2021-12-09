import { AbstractView } from './abstract-view';

const createFilmsListContainerTemplate = () => '<div class="films-list__container"></div>';

class FilmsListContainer extends AbstractView {

  get template() {
    return createFilmsListContainerTemplate();
  }
}

export { FilmsListContainer };
