import { FilterName } from '../const';

const filter = {
  [FilterName.ALL]: (films) => films.filter((film) => !film.isHistory),
  [FilterName.WATCH_LIST]: (films) => films.filter((film) => film.isWatch),
  [FilterName.HISTORY]: (films) => films.filter((film) => film.isHistory),
  [FilterName.FAVORITES]: (films) => films.filter((film) => !film.isHistory && film.isFavorites),
};

export { filter };
