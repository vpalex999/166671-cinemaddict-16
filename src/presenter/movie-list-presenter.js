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

  #renderFilmsList = () => {
    const bodyElement = document.querySelector('body');
    render(this.#filmsListComponent, new FilmsListTitle(this.#films.length), RenderPosition.BEFOREEND);

    if (this.#films.length){
      render(this.#filmsListComponent, this.#filmsListContainerComponent, RenderPosition.BEFOREEND);
    }

    const renderFilm = (filmElement, film) => {
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

    for (const film of this.#films.slice(0, FILM_COUNT_PER_STEP)) {
      renderFilm(this.#filmsListContainerComponent, film);
    }

    if (this.#films.length > FILM_COUNT_PER_STEP) {
      let renderFilmCount = FILM_COUNT_PER_STEP;

      const showMoreButton = new ShowMoreButton();
      render(this.#filmsListComponent, showMoreButton, RenderPosition.BEFOREEND);
      const showMoreElement = this.#filmsListComponent.element.querySelector('.films-list__show-more');

      showMoreElement.addEventListener('click', (evt) => {
        evt.preventDefault();
        this.#films
          .slice(renderFilmCount, renderFilmCount + FILM_COUNT_PER_STEP)
          .forEach((film) => {
            renderFilm(this.#filmsListContainerComponent, film);
          });

        renderFilmCount += FILM_COUNT_PER_STEP;

        if (renderFilmCount >= this.#films.length) {
          showMoreElement.remove();  // TODO: перейти на showMoreButton
        }
      });
    }
  };
}

export { MovieListPresenter };