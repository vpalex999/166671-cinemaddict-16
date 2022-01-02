import { AbstractObservable } from '../utils/abstract-observable';

class MoviesModel extends AbstractObservable {
  #films = [];

  set films(films) {
    this.#films = [...films];
  }

  get films() {
    return this.#films;
  }

  updateFilm = (updateType, update) => {
    this.#films = this.#films.map((film) => film.id === update.id ? update : film);

    this._notify(updateType, update);
  };
}

export { MoviesModel };
