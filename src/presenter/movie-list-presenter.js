import { Films } from '../view/films-view';
import { FilmsList } from '../view/films-list-view';
import { FilmsListTitle } from '../view/films-list-title-view';
import { FilmsListContainer } from '../view/films-list-container-view';
import { ShowMoreButton } from '../view/button-show-more-view';
import { render, RenderPosition, remove } from '../utils/render';

import { FilmDetails } from '../view/film-details-view';
import { FilmCard } from '../view/film-card-view';
import { isEscapeKey } from '../utils/common';

const FILM_COUNT_PER_STEP = 5;

class MovieListPresenter {
  #mainContainer = null;
  #filmsComponent = new Films();
  #filmsListComponent = new FilmsList();
  #filmsListContainerComponent = new FilmsListContainer();
  #renderFilmCount = FILM_COUNT_PER_STEP;
  #showMoreButtonComponent = new ShowMoreButton();
  #films = [];

  constructor(mainContainer){
    this.#mainContainer = mainContainer;
  }

  init = (films) => {
    this.#films = [...films];

    render(this.#mainContainer, this.#filmsComponent, RenderPosition.BEFOREEND);
    render(this.#filmsComponent, this.#filmsListComponent, RenderPosition.BEFOREEND);

    this.#renderMovieList();
  }

  #renderFilm = (filmElement, film) => {
    const bodyElement = document.querySelector('body');
    const filmDetailsCard = new FilmDetails(film);
    const filmCard = new FilmCard(film);


    const removeFilmDetailsCard = () => {
      bodyElement.classList.remove('hide-overflow');
      bodyElement.removeChild(filmDetailsCard.element);
    };

    const addFilmDetailsCard = () => {
      bodyElement.classList.add('hide-overflow');
      bodyElement.appendChild(filmDetailsCard.element);
    };

    const onEscKeyDown = (evt) => {
      if (isEscapeKey(evt)) {
        evt.preventDefault();
        removeFilmDetailsCard();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    filmCard.setShowDetailsHandler(() => {
      addFilmDetailsCard();
      document.addEventListener('keydown', onEscKeyDown);
    });

    filmDetailsCard.setCloseDetailsCard(() => {
      removeFilmDetailsCard();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(filmElement, filmCard, RenderPosition.BEFOREEND);
  };

  #renderFilms = (from, to) => {
    for (const film of this.#films.slice(from, to)) {
      this.#renderFilm(this.#filmsListContainerComponent, film);
    }
  };

  #onShowMoreButtonClick = () => {
    this.#renderFilms(this.#renderFilmCount, this.#renderFilmCount + FILM_COUNT_PER_STEP);
    this.#renderFilmCount += FILM_COUNT_PER_STEP;

    if (this.#renderFilmCount >= this.#films.length) {
      remove(this.#showMoreButtonComponent);
    }
  };

  #renderShowMoreButton = () => {
    this.#showMoreButtonComponent.setClickHandler(this.#onShowMoreButtonClick);
    render(this.#filmsListComponent, this.#showMoreButtonComponent, RenderPosition.BEFOREEND);
  };

  #renderFilmsList = () => {
    this.#renderFilms(0, Math.min(this.#films.length, FILM_COUNT_PER_STEP));

    if (this.#films.length > FILM_COUNT_PER_STEP) {
      this.#renderShowMoreButton();
    }
  };

  #renderMovieList = () => {
    render(this.#filmsListComponent, new FilmsListTitle(this.#films.length), RenderPosition.BEFOREEND);

    if(this.#films.length === 0){
      return;
    }

    if (this.#films.length){
      render(this.#filmsListComponent, this.#filmsListContainerComponent, RenderPosition.BEFOREEND);
    }

    this.#renderFilmsList();

  };

}

export { MovieListPresenter };
