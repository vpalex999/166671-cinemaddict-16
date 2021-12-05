import { createProfileTemplate, Profile } from './view/profile-view';
import { createNavigationTemplate, Navigation } from './view/navigation-view';
import { createFilterTemplate, Filter } from './view/filter-view';
import { createStatsTemplate, Stats } from './view/stats-view';
import { createSortFilmsTemplate, SortFilms } from './view/sort-films-view';
import { createFilmsTemplate, Films } from './view/films-view';
import { createFilmListTemplate, FilmList } from './view/films-list-view';
import { createFilmsListContainerTemplate, FilmsListContainer } from './view/films-list-container-view';
import { createFilmCardTemplate, FilmCard } from './view/film-card-view';
import { createButtonShowMoreTemplate, ShowMoreButton } from './view/button-show-more-view';
import { createFooterStatisticTemplate, FooterStatistic } from './view/statistic-view';
import { createFilmDetailsTemplate, FilmDetails } from './view/film-details-view';
import { renderTemplate, RenderPosition, renderElement } from './render';
import { generateFilm } from './mock/film';
import { generateFilters } from './mock/filter';
import { generateProfile } from './mock/profile';

const FILM_COUNT = 15;
const FILM_COUNT_PER_STEP = 5;
const isShowPopup = false;
const films = Array.from({ length: FILM_COUNT }, generateFilm);
const filters = generateFilters(films);
const profile = generateProfile();

const bodyElement = document.querySelector('body');
const headerElement = bodyElement.querySelector('.header');
const mainElement = bodyElement.querySelector('.main');
const footerElement = bodyElement.querySelector('.footer');
const footerStatisticElement = footerElement.querySelector('.footer__statistics');

// renderTemplate(headerElement, createProfileTemplate(profile), RenderPosition.BEFOREEND);
renderElement(headerElement, new Profile().element, RenderPosition.BEFOREEND);

// renderTemplate(mainElement, createNavigationTemplate(), RenderPosition.BEFOREEND);
renderElement(mainElement, new Navigation().element, RenderPosition.BEFOREEND);

const navigationElement = mainElement.querySelector('.main-navigation');
// renderTemplate(navigationElement, createFilterTemplate(filters), RenderPosition.BEFOREEND);
renderElement(navigationElement, new Filter(filters).element, RenderPosition.BEFOREEND);
// renderTemplate(navigationElement, createStatsTemplate(), RenderPosition.BEFOREEND);
renderElement(navigationElement, new Stats().element, RenderPosition.BEFOREEND);

// renderTemplate(mainElement, createSortFilmsTemplate(), RenderPosition.BEFOREEND);
renderElement(mainElement, new SortFilms().element, RenderPosition.BEFOREEND);

// renderTemplate(mainElement, createFilmsTemplate(), RenderPosition.BEFOREEND);
renderElement(mainElement, new Films().element, RenderPosition.BEFOREEND);

const filmsElement = mainElement.querySelector('.films');
// renderTemplate(filmsElement, createFilmListTemplate(), RenderPosition.BEFOREEND);
renderElement(filmsElement, new FilmList().element, RenderPosition.BEFOREEND);


const filmsListElement = filmsElement.querySelector('.films-list');
// renderTemplate(filmsListElement, createFilmsListContainerTemplate(), RenderPosition.BEFOREEND);
renderElement(filmsListElement, new FilmsListContainer().element,RenderPosition.BEFOREEND);

const filmsListContainerElement = filmsListElement.querySelector('.films-list__container');
for (const film of films.slice(0, FILM_COUNT_PER_STEP)) {
  // renderTemplate(filmsListContainerElement, createFilmCardTemplate(film), RenderPosition.BEFOREEND);
  renderElement(filmsListContainerElement, new FilmCard(film).element, RenderPosition.BEFOREEND);
}

if (films.length > FILM_COUNT_PER_STEP) {
  let renderFilmCount = FILM_COUNT_PER_STEP;

  // renderTemplate(filmsListElement, createButtonShowMoreTemplate(), RenderPosition.BEFOREEND);
  const showMoreButton = new ShowMoreButton();
  renderElement(filmsListElement, showMoreButton.element, RenderPosition.BEFOREEND);
  const showMoreElement = filmsListElement.querySelector('.films-list__show-more');

  showMoreElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(renderFilmCount, renderFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => {
        // renderTemplate(filmsListContainerElement, createFilmCardTemplate(film), RenderPosition.BEFOREEND);
        renderElement(filmsListContainerElement, new FilmCard(film).element, RenderPosition.BEFOREEND);
      });

    renderFilmCount += FILM_COUNT_PER_STEP;

    if (renderFilmCount >= films.length) {
      showMoreElement.remove();  // TODO: перейти на showMoreButton
    }
  });
}

// renderTemplate(footerStatisticElement, createFooterStatisticTemplate(films.length), RenderPosition.BEFOREEND);
renderElement(footerStatisticElement, new FooterStatistic(films.length).element, RenderPosition.BEFOREEND);

if (isShowPopup) {
  bodyElement.classList.add('hide-overflow');
  // renderTemplate(footerElement, createFilmDetailsTemplate(films[1]), RenderPosition.AFTEREND);
  renderElement(footerElement, new FilmDetails(films[0]).element, RenderPosition.BEFOREEND);
}
