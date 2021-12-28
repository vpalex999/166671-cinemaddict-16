import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export const updateFilm = (films, updatedFilm) =>
  films.map((film) => film.id === updatedFilm.id ? updatedFilm : film);

export const sortTaskDate = (filmA, filmB) => dayjs(filmB.releaseDate).diff(dayjs(filmA.releaseDate));

export const sortTaskRating = (filmA, filmB) => filmB.rating - filmA.rating;

export const getFilmDurationFormat = (period) => dayjs.duration(period, 'minutes').format('H[h] mm[min]');
