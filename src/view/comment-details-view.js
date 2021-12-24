import { AbstractView } from './abstract-view';

// TODO:
// 1. Реализует выход без сохранения
// 2. позаботиться при перерисовке о позиции скролла.
// 3.

const createCommentDetailsTemplate = (comment) => {
  const { emoji, text, author, day } = comment;

  return `<li class="film-details__comment">
  <span class="film-details__comment-emoji">
    <img src=${emoji} width="55" height="55" alt="emoji-smile">
  </span>
  <div>
    <p class="film-details__comment-text">${text}</p>
    <p class="film-details__comment-info">
      <span class="film-details__comment-author">${author}</span>
      <span class="film-details__comment-day">${day}</span>
      <button class="film-details__comment-delete">Delete</button>
    </p>
  </div>
</li>`;
};

class CommentDetails extends AbstractView {
  #comment = null;

  constructor(comment) {
    super();
    this.#comment = comment;
  }

  get template() {
    return createCommentDetailsTemplate(this.#comment);
  }
}

export { createCommentDetailsTemplate, CommentDetails };
