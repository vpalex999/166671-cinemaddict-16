import { Profile } from './view/profile-view';
import { Navigation } from './view/navigation-view';
import { Filter } from './view/filter-view';
import { Stats } from './view/stats-view';
import { FooterStatistic } from './view/statistic-view';
import { RenderPosition, render } from './utils/render';
import { generateFilm } from './mock/film';
import { generateFilters } from './mock/filter';
import { generateProfile } from './mock/profile';
import { MovieListPresenter } from './presenter/movie-list-presenter';
import { MoviesModel } from './model/movies-model';

const FILM_COUNT = 15;
const films = Array.from({ length: FILM_COUNT }, generateFilm);
const filters = generateFilters(films);
const profile = generateProfile();

const filmsModel = new MoviesModel();
filmsModel.films = films;


const bodyElement = document.querySelector('body');

const headerElement = bodyElement.querySelector('.header');
const mainElement = bodyElement.querySelector('.main');
const footerElement = bodyElement.querySelector('.footer');
const footerStatisticElement = footerElement.querySelector('.footer__statistics');

render(mainElement, new Navigation().element, RenderPosition.BEFOREEND);

const navigationElement = mainElement.querySelector('.main-navigation');
render(navigationElement, new Filter(filters).element, RenderPosition.BEFOREEND);
render(navigationElement, new Stats().element, RenderPosition.BEFOREEND);

const movieListPresenter = new MovieListPresenter(mainElement, filmsModel);

if (films.length) {
  render(headerElement, new Profile(profile).element, RenderPosition.BEFOREEND);
}

movieListPresenter.init();

render(footerStatisticElement, new FooterStatistic(films.length).element, RenderPosition.BEFOREEND);
