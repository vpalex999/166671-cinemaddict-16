import { Films } from '../view/films-view';
import { FilmsList } from '../view/films-list-view';
import { FilmsListTitle } from '../view/films-list-title-view';
import { FilmsListContainer } from '../view/films-list-container-view';
import { SortFilms } from '../view/sort-films-view';
import { ShowMoreButton } from '../view/button-show-more-view';
import { render, RenderPosition, remove } from '../utils/render';
import { sortTaskDate, sortTaskRating } from '../utils/film';
import { MoviePresenter } from './movie-presenter';
import { SortType, UserAction, UpdateType, FilterName } from '../const';
import { filter } from '../utils/filter';

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
  #filmsModel = null;
  #filterModel = null;
  #filterType = FilterName.ALL;
  #noFilmsTitle = null;
  #filmsTitleUpload = null;

  #currentSortType = SortType.DEFAULT;

  constructor(mainContainer, filmsModel, filterModel) {
    this.#mainContainer = mainContainer;
    this.#filmsModel = filmsModel;
    this.#filterModel = filterModel;

    this.#filmsModel.addObserver(this.#onModelEvent);
    this.#filterModel.addObserver(this.#onModelEvent);
  }

  get films() {

    this.#filterType = this.#filterModel.filter;
    const films = this.#filmsModel.films;
    const filteredFilms = filter[this.#filterType](films);

    switch (this.#currentSortType) {
      case SortType.DATE:
        return filteredFilms.sort(sortTaskDate);
      case SortType.RATING:
        return filteredFilms.sort(sortTaskRating);
      default:
        return filteredFilms;
    }
  }

  init = () => {

    render(this.#mainContainer, this.#filmsComponent, RenderPosition.BEFOREEND);
    render(this.#filmsComponent, this.#filmsListComponent, RenderPosition.BEFOREEND);

    this.#renderMovieList();
  }

  #onModelEvent = (updateType, data) => {
    // Коллбэк вызывается моделью по подписке
    switch (updateType) {
      case UpdateType.PATCH:
        this.#filmPresenterMap.get(data.id).init(data);
        break;
      case UpdateType.MAJOR:
        this.#clearFilmList();
        this.#renderMovieList();
        break;
    }
  };

  #onViewAction = (userAction, updateType, update) => {
    // Здесь будем вызывать обновление модели.
    // userAction - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
    switch (userAction) {
      case UserAction.UPDATE_FILM:
        this.#filmsModel.updateFilm(updateType, update);
        break;
    }
  };

  #clearFilmList = () => {

    if (this.#filmsTitleUpload) {
      remove(this.#filmsTitleUpload);
    }

    if (this.#noFilmsTitle) {
      remove(this.#noFilmsTitle);
    }

    this.#filmPresenterMap.forEach((presenter) => presenter.destroy());
    this.#filmPresenterMap.clear();
    this.#renderFilmCount = FILM_COUNT_PER_STEP;
    remove(this.#showMoreButtonComponent);
  };

  #renderFilm = (film) => {
    const movePresenter = new MoviePresenter(this.#filmsListContainerComponent, this.#onViewAction);
    movePresenter.init(film);
    this.#filmPresenterMap.set(film.id, movePresenter);
  };

  #renderFilms = (from, to) => {
    for (const film of this.films.slice(from, to)) {
      this.#renderFilm(film);
    }
  };


  #onSortTypeChange = (sortType) => {

    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
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

    if (this.#renderFilmCount >= this.films.length) {
      remove(this.#showMoreButtonComponent);
    }
  };

  #renderShowMoreButton = () => {
    this.#showMoreButtonComponent.setClickHandler(this.#onShowMoreButtonClick);
    render(this.#filmsListComponent, this.#showMoreButtonComponent, RenderPosition.BEFOREEND);
  };

  #renderFilmsList = () => {
    this.#renderFilms(0, Math.min(this.films.length, FILM_COUNT_PER_STEP));

    if (this.films.length > FILM_COUNT_PER_STEP) {
      this.#renderShowMoreButton();
    }
  };

  #renderNoFilmsListTitle = () => {
    this.#noFilmsTitle = new FilmsListTitle(this.#filterType);
    render(this.#filmsListComponent, this.#noFilmsTitle, RenderPosition.BEFOREEND);
  }

  #renderFilmsListTitle = () => {
    this.#filmsTitleUpload = new FilmsListTitle();
    render(this.#filmsListComponent, this.#filmsTitleUpload, RenderPosition.BEFOREEND);
  };

  #renderMovieList = () => {

    if (this.films.length === 0) {
      this.#renderNoFilmsListTitle();
      return;
    }

    this.#renderFilmsListTitle();
    render(this.#filmsListComponent, this.#filmsListContainerComponent, RenderPosition.BEFOREEND);
    this.#renderSort();
    this.#renderFilmsList();

  };

}

export { MovieListPresenter };
