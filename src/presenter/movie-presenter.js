import { FilmCard } from '../view/film-card-view';
import { FilmDetails } from '../view/film-details-view';
import { isEscapeKey } from '../utils/common';
import { render, RenderPosition, replace, remove } from '../utils/render';
import { UserAction, UpdateType } from '../const';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

class MoviePresenter {
  #filmListContainerComponent = null;
  #filmDetailsCardComponent = null;
  #filmCardComponent = null;
  #bodyElement = document.querySelector('body');
  #changeData = null;
  #film = null;
  #mode = Mode.DEFAULT;

  constructor(filmListContainer, changeData) {
    this.#filmListContainerComponent = filmListContainer;
    this.#changeData = changeData;
  }

  init = (film) => {
    this.#film = film;

    const prevfilmCardComponent = this.#filmCardComponent;
    const prevfilmDetailsCardComponent = this.#filmDetailsCardComponent;

    this.#filmCardComponent = new FilmCard(this.#film);
    this.#filmDetailsCardComponent = new FilmDetails(this.#film);


    this.#filmCardComponent.setShowDetailsHandler(this.#onShowDetailsHandler);
    this.#filmCardComponent.setAddToWatchListHandler(this.#onAddToWatchList);
    this.#filmCardComponent.setMarkAsWatchedHandler(this.#onMarkAsWatched);
    this.#filmCardComponent.setMarkAsFavoriteHandler(this.#onMarkAsFavorite);

    this.#filmDetailsCardComponent.setCloseDetailsCardHandler(this.#onClosedDetailsCardHandler);
    this.#filmDetailsCardComponent.setAddToWatchListHandler(this.#onAddToWatchList);
    this.#filmDetailsCardComponent.setMarkAsWatchedHandler(this.#onMarkAsWatched);
    this.#filmDetailsCardComponent.setMarkAsFavoriteHandler(this.#onMarkAsFavorite);

    if (prevfilmCardComponent === null || prevfilmDetailsCardComponent === null) {
      render(this.#filmListContainerComponent, this.#filmCardComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#filmCardComponent, prevfilmCardComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#filmCardComponent, prevfilmCardComponent);
      replace(this.#filmDetailsCardComponent, prevfilmDetailsCardComponent);
    }

    remove(prevfilmCardComponent);
    remove(prevfilmDetailsCardComponent);
  };

  destroy = () => {
    remove(this.#filmCardComponent);
    remove(this.#filmDetailsCardComponent);
  }

  #addFilmDetailsCard = () => {
    this.#bodyElement.classList.add('hide-overflow');
    this.#bodyElement.appendChild(this.#filmDetailsCardComponent.element);
    this.#mode = Mode.EDITING;
  };

  #removeFilmDetailsCard = () => {
    this.#bodyElement.classList.remove('hide-overflow');
    this.#bodyElement.removeChild(this.#filmDetailsCardComponent.element);
    this.#mode = Mode.DEFAULT;
  };

  #onEscKeyDown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#filmDetailsCardComponent.reset(this.#film);
      this.#removeFilmDetailsCard();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #onShowDetailsHandler = () => {
    this.#addFilmDetailsCard();
    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  #onClosedDetailsCardHandler = () => {
    this.#filmDetailsCardComponent.reset(this.#film);
    this.#removeFilmDetailsCard();
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #onAddToWatchList = () => {
    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
      { ...this.#film, isWatch: !this.#film.isWatch });
  };

  #onMarkAsWatched = () => {
    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
      { ...this.#film, isHistory: !this.#film.isHistory });
  };

  #onMarkAsFavorite = () => {
    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
      { ...this.#film, isFavorites: !this.#film.isFavorites });
  };

}

export { MoviePresenter };
