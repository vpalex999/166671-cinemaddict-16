import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { SmartView } from './smart-view';
import { getTotalStatistics, getFilteredData } from '../utils/statistic';
import { StatisticFilter } from '../const';

const BAR_HEIGHT = 50;

const renderFilmsChart = (statisticCtx, data) => {
  const { films } = data;
  const { genresMap } = getTotalStatistics(films);

  // Обязательно рассчитайте высоту canvas, она зависит от количества элементов диаграммы
  statisticCtx.height = BAR_HEIGHT * genresMap.size;

  return new Chart(
    statisticCtx,
    {
      plugins: [ChartDataLabels],
      type: 'horizontalBar',
      data: {
        labels: [...genresMap.keys()],
        datasets: [{
          data: [...genresMap.values()],
          backgroundColor: '#ffe800',
          hoverBackgroundColor: '#ffe800',
          anchor: 'start',
          barThickness: 24,
        }],
      },
      options: {
        responsive: false,
        plugins: {
          datalabels: {
            font: {
              size: 20,
            },
            color: '#ffffff',
            anchor: 'start',
            align: 'start',
            offset: 40,
          },
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: '#ffffff',
              padding: 100,
              fontSize: 20,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
          }],
        },
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
        },
      },
    });
};


const createStatisticTemplate = (data) => {
  const { films, avatar, profileRating } = data;

  const { countWatched, hours, minutes, topGenre } = getTotalStatistics(films);

  return `<section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="${avatar}" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${profileRating}</span>
    </p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
      <label for="statistic-all-time" class="statistic__filters-label">All time</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
      <label for="statistic-today" class="statistic__filters-label">Today</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
      <label for="statistic-week" class="statistic__filters-label">Week</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
      <label for="statistic-month" class="statistic__filters-label">Month</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
      <label for="statistic-year" class="statistic__filters-label">Year</label>
    </form>

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${countWatched} <span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${hours} <span class="statistic__item-description">h</span> ${minutes} <span class="statistic__item-description">m</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${topGenre}</p>
      </li>
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>

  </section>`;
};

class StatisticView extends SmartView {
  #filmsChart = null;

  static parseFilmsToData = (data, { avatar, rating: profileRating }) => ({
    films: [...data],
    avatar,
    profileRating,
    statisticFilter: StatisticFilter.ALL,
  });

  constructor(films, profile) {
    super();

    this._data = StatisticView.parseFilmsToData(films, profile);
  }

  init = () => {
    this.#setCharts();
    this.#setClickFilterHandler();
    this.#setFilter();
  };

  removeElement = () => {
    super.removeElement();

    if (this.#filmsChart) {
      this.#filmsChart.destroy();
      this.#filmsChart = null;
    }
  };

  get template() {
    const films = getFilteredData(this._data);
    return createStatisticTemplate({ ...this._data, films });
  }

  restoreHandlers = () => {
    this.init();
  };

  #onClickFilter = (evt) => {
    evt.preventDefault();
    this.updateData({ statisticFilter: evt.target.value });
  };

  #setClickFilterHandler = () => {
    this.element.querySelector('.statistic__filters').addEventListener('change', this.#onClickFilter);
  };

  #setFilter = () => {
    const item = this.element.querySelector(`[value=${this._data.statisticFilter}]`);

    if (item !== null) {
      item.checked = true;
    }
  }

  #setCharts = () => {
    // отрисовать графики
    const statisticCtx = document.querySelector('.statistic__chart');
    const films = getFilteredData(this._data);
    this.#filmsChart = renderFilmsChart(statisticCtx, { ...this._data, films });
  };
}

export { StatisticView };
