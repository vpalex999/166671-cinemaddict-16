import { Profile } from './view/profile-view';
import { FooterStatistic } from './view/footer-statistic-view';
import { RenderPosition, render } from './utils/render';
import { generateFilm } from './mock/film';
import { generateProfile } from './mock/profile';
import { MovieListPresenter } from './presenter/movie-list-presenter';
import { NavigationPresenter } from './presenter/navigation-presenter';
import { StatisticPresenter } from './presenter/statistic-presenter';
import { MoviesModel } from './model/movies-model';
import { FilterModel } from './model/filters-model';
import { MenuModel } from './model/menu-model';


const FILM_COUNT = 15;
const films = Array.from({ length: FILM_COUNT }, generateFilm);
const profile = generateProfile();

const filmsModel = new MoviesModel();
filmsModel.films = films;

const filterModel = new FilterModel();
const menuModel = new MenuModel();

const bodyElement = document.querySelector('body');

const headerElement = bodyElement.querySelector('.header');
const mainElement = bodyElement.querySelector('.main');
const footerElement = bodyElement.querySelector('.footer');
const footerStatisticElement = footerElement.querySelector('.footer__statistics');

const navigationPresenter = new NavigationPresenter(mainElement, menuModel, filterModel, filmsModel);
const movieListPresenter = new MovieListPresenter(mainElement, filmsModel, filterModel, menuModel);
const statisticPresenter = new StatisticPresenter(mainElement, menuModel, filmsModel);

if (films.length) {
  render(headerElement, new Profile(profile).element, RenderPosition.BEFOREEND);
}

navigationPresenter.init();
movieListPresenter.init();
statisticPresenter.init();

render(footerStatisticElement, new FooterStatistic(films.length).element, RenderPosition.BEFOREEND);

