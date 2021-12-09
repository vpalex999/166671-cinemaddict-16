import { AbstractView } from './abstract-view';

const createFilmListTemplate = () => '<section class="films-list"></section>';

class FilmList extends AbstractView {

  get template() {
    return createFilmListTemplate();
  }
}

export { FilmList };
