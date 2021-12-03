import { createProfileTemplate } from './view/profile-view';
import { createNavigationTemplate } from './view/navigation-view';
import { createFilterTemplate } from './view/filter-view';
import { createStatsTemplate } from './view/stats-view';
import { createSortFilmsTemplate } from './view/sort-films-view';
import { createFilmsTemplate } from './view/films-view';
import { createFilmListTemplate } from './view/films-list-view';
import { createFilmsListContainerTemplate } from './view/films-list-container-view';
import { createFilmCardTemplate } from './view/film-card-view';
import { createButtonShowMoreTemplate } from './view/button-show-more-view';
import { createFooterStatisticTemplate } from './view/statistic-view';
import { createFilmDetailsTemplate } from './view/film-details-view';
import { renderTemplate, RenderPosition } from './render';
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

renderTemplate(headerElement, createProfileTemplate(profile), RenderPosition.BEFOREEND);

renderTemplate(mainElement, createNavigationTemplate(), RenderPosition.BEFOREEND);

const navigationElement = mainElement.querySelector('.main-navigation');
renderTemplate(navigationElement, createFilterTemplate(filters), RenderPosition.BEFOREEND);
renderTemplate(navigationElement, createStatsTemplate(), RenderPosition.BEFOREEND);

renderTemplate(mainElement, createSortFilmsTemplate(), RenderPosition.BEFOREEND);

renderTemplate(mainElement, createFilmsTemplate(), RenderPosition.BEFOREEND);

const filmsElement = mainElement.querySelector('.films');
renderTemplate(filmsElement, createFilmListTemplate(), RenderPosition.BEFOREEND);


const filmsListElement = filmsElement.querySelector('.films-list');
renderTemplate(filmsListElement, createFilmsListContainerTemplate(), RenderPosition.BEFOREEND);

const filmsListContainerElement = filmsListElement.querySelector('.films-list__container');
for (const film of films.slice(0, FILM_COUNT_PER_STEP)) {
  renderTemplate(filmsListContainerElement, createFilmCardTemplate(film), RenderPosition.BEFOREEND);
}

if (films.length > FILM_COUNT_PER_STEP) {
  let renderFilmCount = FILM_COUNT_PER_STEP;

  renderTemplate(filmsListElement, createButtonShowMoreTemplate(), RenderPosition.BEFOREEND);
  const showMoreElement = filmsListElement.querySelector('.films-list__show-more');

  showMoreElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(renderFilmCount, renderFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => {
        renderTemplate(filmsListContainerElement, createFilmCardTemplate(film), RenderPosition.BEFOREEND);
      });

    renderFilmCount += FILM_COUNT_PER_STEP;

    if (renderFilmCount >= films.length) {
      showMoreElement.remove();
    }
  });
}

renderTemplate(footerStatisticElement, createFooterStatisticTemplate(films.length), RenderPosition.BEFOREEND);

if (isShowPopup) {
  bodyElement.classList.add('hide-overflow');
  renderTemplate(footerElement, createFilmDetailsTemplate(films[1]), RenderPosition.AFTEREND);
}
