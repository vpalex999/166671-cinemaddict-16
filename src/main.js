import { Profile } from './view/profile-view';
import { Navigation } from './view/navigation-view';
import { StatisticView } from './view/statistic-view';
import { Stats } from './view/stats-view';
import { FooterStatistic } from './view/footer-statistic-view';
import { RenderPosition, render } from './utils/render';
import { generateFilm } from './mock/film';
import { generateProfile } from './mock/profile';
import { MovieListPresenter } from './presenter/movie-list-presenter';
import { MoviesModel } from './model/movies-model';
import { FilterModel } from './model/filters-model';
import { FilterPresenter } from './presenter/filter-presenter';

const FILM_COUNT = 15;
const films = Array.from({ length: FILM_COUNT }, generateFilm);
const profile = generateProfile();

const filmsModel = new MoviesModel();
filmsModel.films = films;

const filterModel = new FilterModel();


const bodyElement = document.querySelector('body');

const headerElement = bodyElement.querySelector('.header');
const mainElement = bodyElement.querySelector('.main');
const footerElement = bodyElement.querySelector('.footer');
const footerStatisticElement = footerElement.querySelector('.footer__statistics');

render(mainElement, new Navigation().element, RenderPosition.BEFOREEND);

const navigationElement = mainElement.querySelector('.main-navigation');

const filterPresenter = new FilterPresenter(navigationElement, filterModel, filmsModel);
filterPresenter.init();

render(navigationElement, new Stats().element, RenderPosition.BEFOREEND);

const movieListPresenter = new MovieListPresenter(mainElement, filmsModel, filterModel);

if (films.length) {
  render(headerElement, new Profile(profile).element, RenderPosition.BEFOREEND);
}

movieListPresenter.init();

render(mainElement, new StatisticView().element, RenderPosition.BEFOREEND);

render(footerStatisticElement, new FooterStatistic(films.length).element, RenderPosition.BEFOREEND);
