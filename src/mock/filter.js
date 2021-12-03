
const filmToFilterMap = {
  watchList: (films) => films.filter((film) => film.isWatch).length,
  history: (films) => films.filter((film) => film.isHistory).length,
  favorites: (films) => films
    .filter((film) => !film.isHistory)
    .filter((film) => film.isFavorites)
    .length,
};

const generateFilters = (films) => Object.entries(filmToFilterMap)
  .map(([filterName, countFilms]) => ({
    name: filterName,
    count: countFilms(films),
  }),
  );

export { generateFilters };
