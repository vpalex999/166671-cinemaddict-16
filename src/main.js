import { createProfileTemplate } from './view/profile-view';
import { createFilterTemplate } from './view/filter-view';
import { createSortFilmsTemplate } from './view/sort-films-view';
import { createFilmsTemplate } from './view/films-view';
import { createFilmListTemplate } from './view/films-list-view';
import { createFilmsListContainerTemplate } from './view/films-list-container-view';
import { createFilmCardTemplate } from './view/film-card-view';
import { createButtonShowMoreTemplate } from './view/button-show-more-view';
import { createStatisticTemplate } from './view/statistic-view';
import { createFilmDetailsTemplate } from './view/film-details-view';
import { generateFilm } from './mock/film';
import { generateProfile } from './mock/profile';

const FILM_COUNT = 15;
const isShowPopup = false;
const films = Array.from({ length: FILM_COUNT }, generateFilm);
const profile = generateProfile();

const bodyElement = document.querySelector('body');
const headerElement = bodyElement.querySelector('.header');
const mainElement = bodyElement.querySelector('.main');
const footerElement = bodyElement.querySelector('.footer');
const footerStatisticElement = footerElement.querySelector('.footer__statistics');

const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend'
};

const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

renderTemplate(headerElement, createProfileTemplate(profile), RenderPosition.BEFOREEND);
renderTemplate(mainElement, createFilterTemplate(films), RenderPosition.BEFOREEND);
renderTemplate(mainElement, createSortFilmsTemplate(), RenderPosition.BEFOREEND);
renderTemplate(mainElement, createFilmsTemplate(), RenderPosition.BEFOREEND);

const filmsElement = mainElement.querySelector('.films');
renderTemplate(filmsElement, createFilmListTemplate(), RenderPosition.BEFOREEND);


const filmsListElement = filmsElement.querySelector('.films-list');
renderTemplate(filmsListElement, createFilmsListContainerTemplate(), RenderPosition.BEFOREEND);

const filmsListContainerElement = filmsListElement.querySelector('.films-list__container');
for (const film of films) {
  renderTemplate(filmsListContainerElement, createFilmCardTemplate(film), RenderPosition.BEFOREEND);
}

renderTemplate(filmsListElement, createButtonShowMoreTemplate(), RenderPosition.BEFOREEND);

renderTemplate(footerStatisticElement, createStatisticTemplate(), RenderPosition.BEFOREEND);

if (isShowPopup) {
  bodyElement.classList.add('hide-overflow');
  renderTemplate(footerElement, createFilmDetailsTemplate(films[1]), RenderPosition.AFTEREND);
}
