import dayjs from 'dayjs';

export const updateFilm = (films, updatedFilm) =>
  films.map((film) => film.id === updatedFilm.id ? updatedFilm : film);

export const sortTaskDate = (filmA, filmB) => dayjs(filmB.releaseDate).diff(dayjs(filmA.releaseDate));

export const sortTaskRating = (filmA, filmB) => filmB.rating - filmA.rating;
