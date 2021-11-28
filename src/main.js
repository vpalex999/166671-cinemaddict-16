import { createProfileTemplate } from './view/profile-view';
import { createMainMenuTemplate } from './view/menu-view';
import { createSortFilmsTemplate } from './view/sort-films-view';
import { createFilmsTemplate } from './view/films-view';
import { createFilmListTemplate } from './view/films-list-view';
import { createFilmsListContainerTemplate } from './view/films-list-container-view';
import { createFilmCardTemplate } from './view/film-card-view';
import { createButtonShowMoreTemplate } from './view/button-show-more-view';
import { createStatisticTemplate } from './view/statistic-view';
import { createFilmDetailsTemplate } from './view/film-details-view';

const FILM_COUNT = 5;
const isShowPopup = false;

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

renderTemplate(headerElement, createProfileTemplate(), RenderPosition.BEFOREEND);
renderTemplate(mainElement, createMainMenuTemplate(), RenderPosition.BEFOREEND);
renderTemplate(mainElement, createSortFilmsTemplate(), RenderPosition.BEFOREEND);
renderTemplate(mainElement, createFilmsTemplate(), RenderPosition.BEFOREEND);

const filmsElement = mainElement.querySelector('.films');
renderTemplate(filmsElement, createFilmListTemplate(), RenderPosition.BEFOREEND);


const filmsListElement = filmsElement.querySelector('.films-list');
renderTemplate(filmsListElement, createFilmsListContainerTemplate(), RenderPosition.BEFOREEND);

const filmsListContainerElement = filmsListElement.querySelector('.films-list__container');
for (let i = 0; i < FILM_COUNT; i++) {
  renderTemplate(filmsListContainerElement, createFilmCardTemplate(), RenderPosition.BEFOREEND);
}

renderTemplate(filmsListElement, createButtonShowMoreTemplate(), RenderPosition.BEFOREEND);

renderTemplate(footerStatisticElement, createStatisticTemplate(), RenderPosition.BEFOREEND);

if (isShowPopup) {
  bodyElement.classList.add('hide-overflow');
  renderTemplate(footerElement, createFilmDetailsTemplate(), RenderPosition.AFTEREND);
}
