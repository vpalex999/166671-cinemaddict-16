import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isToday from 'dayjs/plugin/isToday';
import { StatisticFilter, STATISTIC_FILTER_DATE } from '../const';


dayjs.extend(isBetween);
dayjs.extend(isToday);

const getTotalDuration = (period) => {
  const hours = Math.floor(period / 60);
  const minutes = period - (hours * 60);
  return { hours, minutes };
};

const sortMap = (map) => new Map([...map.entries()]
  .sort()
  .sort((a, b) => b[1] - a[1]));

const getTopGenre = (map) => {
  const sortedKeys = [...sortMap(map).keys()];
  return { topGenre: sortedKeys.length ? sortedKeys[0] : '' };
};

const getFilmsTotalData = (films) => {
  let countWatched = 0;
  let totalDuration = 0;
  const genresMap = new Map();

  films.forEach((film) => {
    if (film.isHistory) {
      countWatched = countWatched + 1;
    }

    totalDuration = totalDuration + film.duration;

    film.genres.forEach((genre) => {
      if (genresMap.has(genre)) {
        genresMap.set(genre, genresMap.get(genre) + 1);
      }
      else {
        genresMap.set(genre, 1);
      }
    });
  });

  const topGenre = getTopGenre(genresMap);

  return ({
    genresMap,
    countWatched,
    totalDuration,
    ...topGenre
  });
};

const getTotalStatistics = (films) => {
  const { countWatched, totalDuration, topGenre, genresMap } = getFilmsTotalData(films);

  return {
    genresMap: sortMap(genresMap),
    countWatched,
    topGenre,
    ...getTotalDuration(totalDuration),
  };
};

const isBetweenDay = (date, filterDate) => {
  const dateFrom = dayjs().subtract(1, filterDate).toDate();
  const dateTo = dayjs().toDate();
  return dayjs(date).isBetween(dateFrom, dateTo);
};

const getFilteredData = ({ films, statisticFilter }) =>
  films.filter((film) => {
    if (film.isHistory) {
      switch (statisticFilter) {
        case StatisticFilter.TODAY:
          if (dayjs(film.watchingDate).isToday()) {
            return film;
          }
          break;
        case StatisticFilter.WEEK:
          if (isBetweenDay(film.watchingDate, STATISTIC_FILTER_DATE.WEEK)) {
            return film;
          }
          break;
        case StatisticFilter.MONTH:
          if (isBetweenDay(film.watchingDate, STATISTIC_FILTER_DATE.MONTH)) {
            return film;
          }
          break;
        case StatisticFilter.YEAR:
          if (isBetweenDay(film.watchingDate, STATISTIC_FILTER_DATE.YEAR)) {
            return film;
          }
          break;
        default:
          return film;
      }
    }
  });

export { getTotalStatistics, getFilteredData };
