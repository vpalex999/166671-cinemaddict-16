import { AbstractView } from './abstract-view';

const createFooterStatisticTemplate = (count = 0) => `<p>${count} movies inside</p>`;

class FooterStatistic extends AbstractView {
  #count = null;

  constructor(count) {
    super();
    this.#count = count;
  }

  get template() {
    return createFooterStatisticTemplate(this.#count);
  }
}

export { FooterStatistic };
