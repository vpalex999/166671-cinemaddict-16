import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(duration);
dayjs.extend(relativeTime);

export const updateFilm = (films, updatedFilm) =>
  films.map((film) => film.id === updatedFilm.id ? updatedFilm : film);

export const sortTaskDate = (filmA, filmB) => dayjs(filmB.releaseDate).diff(dayjs(filmA.releaseDate));

export const sortTaskRating = (filmA, filmB) => filmB.rating - filmA.rating;

export const getFilmDurationFormat = (period) => dayjs.duration(period, 'minutes').format('H[h] mm[min]');

export const getFilmReleaseDateFormat = (date) => dayjs(date).format('DD MMMM YYYY');

export const getCommentDateFormat = (date) => dayjs(date).fromNow();
