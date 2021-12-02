const createFilterTemplate = (films = []) => {

  const watchListCount = films.reduce((count, film) => count + (film.isWatch ? 1 : 0), 0);
  const historyCount = films.reduce((count, film) => count + (film.isHistory ? 1 : 0), 0);
  const favoritesCount = films.reduce((count, film) => count + (film.isFavorites ? 1 : 0), 0);

  return `<div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchListCount}</span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${historyCount}</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favoritesCount}</span></a>
    </div>
  </nav>`;
};

export { createFilterTemplate };
