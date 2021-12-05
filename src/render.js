const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend'
};

const renderElement = (container, element, place) => {
  if (element) {
    switch (place) {
      case RenderPosition.BEFOREBEGIN:
        container.before(element);
        break;
      case RenderPosition.AFTERBEGIN:
        container.prepend(element);
        break;
      case RenderPosition.BEFOREEND:
        container.append(element);
        break;
      case RenderPosition.AFTEREND:
        container.after(element);
        break;
    }
  }
};

const createElement = (templateElement) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = templateElement;

  return newElement.firstChild;
};

export { RenderPosition, renderElement, createElement };
