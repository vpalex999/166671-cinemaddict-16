import { AbstractView } from './abstract-view';

class SmartView extends AbstractView {

  _data = {};

  restoreHandlers = () => {
    throw new Error('Absctract method not implemented: restoreHandlers');
  };

  updateElement = () => {
    const prevElement = this.element;
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.element;

    parent.replaceChild(newElement, prevElement);
    this.restoreHandlers();
  };

  updateData = (update, justDataUpdating) => {
    if (!update) {
      return;
    }

    this._data = { ...this._data, ...update };

    if (justDataUpdating) {
      return;
    }

    this.updateElement();
  };
}

export { SmartView };
