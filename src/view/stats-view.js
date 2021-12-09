import { AbstractView } from './abstract-view';

const createStatsTemplate = () => '<a href="#stats" class="main-navigation__additional">Stats</a>';

class Stats extends AbstractView {

  get template() {
    return createStatsTemplate();
  }
}
export { Stats };
