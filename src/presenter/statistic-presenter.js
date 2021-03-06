import { MenuItem } from '../const';
import { render, remove, RenderPosition } from '../utils/render';
import { StatisticView } from '../view/statistic-view';


class StatisticPresenter {
  #mainContainer = null;
  #statisticComponent = null;
  #menuModel = null;
  #filmModel = null;
  #profile = null;

  constructor(mainContainer, menuModel, filmModel, profile) {
    this.#mainContainer = mainContainer;
    this.#menuModel = menuModel;
    this.#filmModel = filmModel;
    this.#profile = profile;
  }

  init = () => {
    this.#menuModel.addObserver(this.#onModelEvent);
  };

  #onModelEvent = (menuItem) => {
    switch (menuItem) {
      case MenuItem.FILTERS:
        this.#removeStatistic();
        break;
      case MenuItem.STATISTICS:
        this.#displayStatistic();
        break;
    }
  };

  #removeStatistic = () => {
    remove(this.#statisticComponent);
    this.#statisticComponent = null;
  };

  #displayStatistic = () => {
    if (this.#statisticComponent === null) {
      this.#statisticComponent = new StatisticView(this.#filmModel.films, this.#profile);
      render(this.#mainContainer, this.#statisticComponent, RenderPosition.BEFOREEND);
      this.#statisticComponent.init();
    }
  };

}

export { StatisticPresenter };
