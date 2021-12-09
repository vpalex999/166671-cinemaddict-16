import { Profile } from './view/profile-view';
import { Navigation } from './view/navigation-view';
import { Filter } from './view/filter-view';
import { Stats } from './view/stats-view';
import { SortFilms } from './view/sort-films-view';
import { Films } from './view/films-view';
import { FilmList } from './view/films-list-view';
import { FilmsListTitle } from './view/films-list-title-view';
import { FilmsListContainer } from './view/films-list-container-view';
import { FilmCard } from './view/film-card-view';
import { ShowMoreButton } from './view/button-show-more-view';
import { FooterStatistic } from './view/statistic-view';
import { FilmDetails } from './view/film-details-view';
import { RenderPosition, render } from './utils/render';
import { generateFilm } from './mock/film';
import { generateFilters } from './mock/filter';
import { generateProfile } from './mock/profile';
import { isEscapeKey } from './utils/common';

const FILM_COUNT = 15;
const FILM_COUNT_PER_STEP = 5;
const films = Array.from({ length: FILM_COUNT }, generateFilm);
const filters = generateFilters(films);
const profile = generateProfile();

const bodyElement = document.querySelector('body');
const headerElement = bodyElement.querySelector('.header');
const mainElement = bodyElement.querySelector('.main');
const footerElement = bodyElement.querySelector('.footer');
const footerStatisticElement = footerElement.querySelector('.footer__statistics');

render(mainElement, new Navigation().element, RenderPosition.BEFOREEND);

const navigationElement = mainElement.querySelector('.main-navigation');
render(navigationElement, new Filter(filters).element, RenderPosition.BEFOREEND);
render(navigationElement, new Stats().element, RenderPosition.BEFOREEND);

render(mainElement, new Films().element, RenderPosition.BEFOREEND);
const filmsElement = mainElement.querySelector('.films');
render(filmsElement, new FilmList().element, RenderPosition.AFTERBEGIN);
const filmsListElement = filmsElement.querySelector('.films-list');
render(filmsListElement, new FilmsListTitle(films.length).element, RenderPosition.BEFOREEND);

if (films.length) {
  render(headerElement, new Profile(profile).element, RenderPosition.BEFOREEND);
  render(navigationElement, new SortFilms().element, RenderPosition.AFTEREND);

  render(filmsListElement, new FilmsListContainer().element, RenderPosition.BEFOREEND);

  const filmsListContainerElement = filmsListElement.querySelector('.films-list__container');


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
      document.addEventListener('keydown', onEscKeyDown);
    });

    render(filmElement, filmCard.element, RenderPosition.BEFOREEND);
  };

  for (const film of films.slice(0, FILM_COUNT_PER_STEP)) {
    renderFilm(filmsListContainerElement, film);
  }


  if (films.length > FILM_COUNT_PER_STEP) {
    let renderFilmCount = FILM_COUNT_PER_STEP;

    const showMoreButton = new ShowMoreButton();
    render(filmsListElement, showMoreButton.element, RenderPosition.BEFOREEND);
    const showMoreElement = filmsListElement.querySelector('.films-list__show-more');

    showMoreElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      films
        .slice(renderFilmCount, renderFilmCount + FILM_COUNT_PER_STEP)
        .forEach((film) => {
          renderFilm(filmsListContainerElement, film);
        });

      renderFilmCount += FILM_COUNT_PER_STEP;

      if (renderFilmCount >= films.length) {
        showMoreElement.remove();  // TODO: перейти на showMoreButton
      }
    });
  }
}

render(footerStatisticElement, new FooterStatistic(films.length).element, RenderPosition.BEFOREEND);
