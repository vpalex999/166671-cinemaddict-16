import { Films } from '../view/films-view';
import { FilmsList } from '../view/films-list-view';
import { FilmsListTitle } from '../view/films-list-title-view';
import { FilmsListContainer } from '../view/films-list-container-view';
import { ShowMoreButton } from '../view/button-show-more-view';
import { render, RenderPosition } from '../utils/render';

import { FilmDetails } from '../view/film-details-view';
import { FilmCard } from '../view/film-card-view';
import { isEscapeKey } from '../utils/common';

const FILM_COUNT_PER_STEP = 5;

class MovieListPresenter {
  #filmsListContainer = null;
  #filmsComponent = new Films();
  #filmsListComponent = new FilmsList();
  #filmsListContainerComponent = new FilmsListContainer();
  #films = [];

  constructor(filmsListContainer){
    this.#filmsListContainer = filmsListContainer;
  }

  init = (films) => {
    this.#films = [...films];

    render(this.#filmsListContainer, this.#filmsComponent, RenderPosition.BEFOREEND);
    render(this.#filmsComponent, this.#filmsListComponent, RenderPosition.BEFOREEND);

    this.#renderFilmsList();
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

  #renderShowMoreButton = () => {
    let renderFilmCount = FILM_COUNT_PER_STEP;
    const showMoreButton = new ShowMoreButton();

    render(this.#filmsListComponent, showMoreButton, RenderPosition.BEFOREEND);
    const showMoreElement = this.#filmsListComponent.element.querySelector('.films-list__show-more');

    showMoreElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      this.#renderFilms(renderFilmCount, renderFilmCount + FILM_COUNT_PER_STEP);

      renderFilmCount += FILM_COUNT_PER_STEP;

      if (renderFilmCount >= this.#films.length) {
        showMoreElement.remove();
      }
    });
  };

  #renderFilmsList = () => {
    render(this.#filmsListComponent, new FilmsListTitle(this.#films.length), RenderPosition.BEFOREEND);

    if(this.#films.length === 0){
      return;
    }

    if (this.#films.length){
      render(this.#filmsListComponent, this.#filmsListContainerComponent, RenderPosition.BEFOREEND);
    }

    this.#renderFilms(0, Math.min(this.#films.length, FILM_COUNT_PER_STEP));

    if (this.#films.length > FILM_COUNT_PER_STEP) {
      this.#renderShowMoreButton();
    }
  };

}

export { MovieListPresenter };
