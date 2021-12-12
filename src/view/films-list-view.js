import { AbstractView } from './abstract-view';

const createFilmListTemplate = () => '<section class="films-list"></section>';

class FilmsList extends AbstractView {

  get template() {
    return createFilmListTemplate();
  }
}

export { FilmsList };
