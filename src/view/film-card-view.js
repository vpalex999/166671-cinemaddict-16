import { AbstractView } from './abstract-view';
import { getFilmDurationFormat } from '../utils/film';

const createFilmCardTemplate = (film) => {
  const { title, rating, year, duration, genres, poster, description, comments } = film;

  const reduceDescription = (text) => text.length > 140
    ? `${text.slice(0, 140)}...`
    : text;

  const runTime = getFilmDurationFormat(duration);

  return `<article class="film-card">
    <a class="film-card__link">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${runTime}</span>
        <span class="film-card__genre">${genres[0]}</span>
      </p>
      <img src="${poster}" alt="" class="film-card__poster">
      <p class ="film-card__description">${reduceDescription(description)}</p>
      <span class ="film-card__comments">${comments.length} comments</span>
    </a>
    <div class="film-card__controls">
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist film-card__controls-item--active" type="button">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched film-card__controls-item--active" type="button">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite film-card__controls-item--active" type="button">Mark as favorite</button>
    </div>
  </article>`;
};

class FilmCard extends AbstractView {
  #film = null;

  constructor(film) {
    super();
    this.#film = film;
  }

  get template() {
    return createFilmCardTemplate(this.#film);
  }

  #onClick = () => {
    this._callback.showDetails();
  };

  setShowDetailsHandler = (callback) => {
    this._callback.showDetails = callback;
    this.element
      .querySelector('.film-card__link')
      .addEventListener('click', this.#onClick);
  };

  #onAddToWatchListClick = (evt) => {
    evt.preventDefault();
    this._callback.addToWatchList();
  };

  setAddToWatchListHandler = (callback) => {
    this._callback.addToWatchList = callback;
    this.element
      .querySelector('.film-card__controls-item--add-to-watchlist')
      .addEventListener('click', this.#onAddToWatchListClick);
  };

  #onMarkAsWatchedClick = (evt) => {
    evt.preventDefault();
    this._callback.markAsWatched();
  };

  setMarkAsWatchedHandler = (callback) => {
    this._callback.markAsWatched = callback;
    this.element
      .querySelector('.film-card__controls-item--mark-as-watched')
      .addEventListener('click', this.#onMarkAsWatchedClick);
  };

  #onMarkAsFavoriteClick = (evt) => {
    evt.preventDefault();
    this._callback.markAsFavorite();
  };

  setMarkAsFavoriteHandler = (callback) => {
    this._callback.markAsFavorite = callback;
    this.element
      .querySelector('.film-card__controls-item--favorite')
      .addEventListener('click', this.#onMarkAsFavoriteClick);
  };
}

export { FilmCard };
