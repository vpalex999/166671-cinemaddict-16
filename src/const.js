export const FilterName = {
  ALL: 'All movies',
  WATCH_LIST: 'Watchlist',
  HISTORY: 'History',
  FAVORITES: 'Favorites'
};

export const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating'
};

export const EMOJIS = ['smile', 'sleeping', 'puke', 'angry'];

export const UserAction = {
  UPDATE_FILM: 'UPDATE_FILM',
  DELETE_COMMENT: 'DELETE_COMMENT',
  ADD_COMMENT: 'ADD_COMMENT',
};

export const UpdateType = {
  PATCH: 'PATCH',  // обновляем только представление фильма и его расширенную реализацию.
  MINOR: 'MINOR',  // пока не понятно
  MAJOR: 'MAJOR',  // всё рендерим
};
