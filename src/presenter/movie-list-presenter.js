import { Films } from '../view/films-view';
import { FilmsList } from '../view/films-list-view';
import { FilmsListTitle } from '../view/films-list-title-view';
import { FilmsListContainer } from '../view/films-list-container-view';
import { SortFilms } from '../view/sort-films-view';
import { ShowMoreButton } from '../view/button-show-more-view';
import { render, RenderPosition, remove } from '../utils/render';
import { updateFilm, sortTaskDate, sortTaskRating } from '../utils/film';
import { MoviePresenter } from './movie-presenter';
import { SortType } from '../const';

const FILM_COUNT_PER_STEP = 5;

class MovieListPresenter {
  #mainContainer = null;
  #sortFilmsComponent = new SortFilms();
  #filmsComponent = new Films();
  #filmsListComponent = new FilmsList();
  #filmsListContainerComponent = new FilmsListContainer();
  #renderFilmCount = FILM_COUNT_PER_STEP;
  #showMoreButtonComponent = new ShowMoreButton();
  #filmPresenterMap = new Map();
  #films = [];
  #filmsModel = null;

  #currentSortType = SortType.DEFAULT;
  #sourceFilms = [];

  constructor(mainContainer, filmsModel) {
    this.#mainContainer = mainContainer;
    this.#filmsModel = filmsModel;
  }

  get films() {
    return this.#filmsModel.films;
  }

  init = () => {
    this.#films = [...this.films];
    this.#sourceFilms = [...this.films];

    render(this.#mainContainer, this.#filmsComponent, RenderPosition.BEFOREEND);
    render(this.#filmsComponent, this.#filmsListComponent, RenderPosition.BEFOREEND);

    this.#renderMovieList();
  }

  #onFilmChange = (updatedFilm) => {
    this.#films = updateFilm(this.#films, updatedFilm);
    this.#sourceFilms = updateFilm(this.#films, updatedFilm);
    this.#filmPresenterMap.get(updatedFilm.id).init(updatedFilm);
  };

  #clearFilmList = () => {
    this.#filmPresenterMap.forEach((presenter) => presenter.destroy());
    this.#filmPresenterMap.clear();
    this.#renderFilmCount = FILM_COUNT_PER_STEP;
    remove(this.#showMoreButtonComponent);
  };

  #renderFilm = (film) => {
    const movePresenter = new MoviePresenter(this.#filmsListContainerComponent, this.#onFilmChange);
    movePresenter.init(film);
    this.#filmPresenterMap.set(film.id, movePresenter);
  };

  #renderFilms = (from, to) => {
    for (const film of this.#films.slice(from, to)) {
      this.#renderFilm(film);
    }
  };

  #sortFilms = (sortType) => {
    switch (sortType) {
      case SortType.DATE:
        this.#films.sort(sortTaskDate);
        break;
      case SortType.RATING:
        this.#films.sort(sortTaskRating);
        break;
      default:
        this.#films = [...this.#sourceFilms];
    }

    this.#currentSortType = sortType;
  }

  #onSortTypeChange = (sortType) => {

    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortFilms(sortType);
    this.#clearFilmList();
    this.#renderFilmsList();
  }

  #renderSort = () => {
    this.#sortFilmsComponent.setSortTypeChangeHandler(this.#onSortTypeChange);
    render(this.#filmsComponent, this.#sortFilmsComponent, RenderPosition.BEFOREBEGIN);
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

    if (this.#films.length === 0) {
      return;
    }

    render(this.#filmsListComponent, this.#filmsListContainerComponent, RenderPosition.BEFOREEND);
    this.#renderSort();
    this.#renderFilmsList();

  };

}

export { MovieListPresenter };
