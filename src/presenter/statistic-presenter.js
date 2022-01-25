import { MenuItem } from '../const';
import { render, remove, RenderPosition } from '../utils/render';
import { StatisticView } from '../view/statistic-view';


class StatisticPresenter {
  #mainContainer = null;
  #statisticComponent = null;
  #menuModel = null;
  #filmModel = null;

  constructor(mainContainer, menuModel, filmModel){
    this.#mainContainer = mainContainer;
    this.#menuModel = menuModel;
    this.#filmModel = filmModel;
  }

  init = () => {
    this.#menuModel.addObserver(this.#onModelEvent);
  };

  #onModelEvent = (menuItem) => {
    switch (menuItem){
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
    if (this.#statisticComponent === null){
      this.#statisticComponent = new StatisticView();
      render(this.#mainContainer, this.#statisticComponent, RenderPosition.BEFOREEND);
    }
  };

}

export { StatisticPresenter };
