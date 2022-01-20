import { AbstractView } from './abstract-view';
import { getCommentDateFormat } from '../utils/film';

const createCommentDetailsTemplate = (comment) => {
  const { emoji, text, author, day, id } = comment;

  const dayComment = getCommentDateFormat(day);

  return `<li class="film-details__comment">
  <span class="film-details__comment-emoji">
    <img src=${emoji} width="55" height="55" alt="emoji-smile">
  </span>
  <div>
    <p class="film-details__comment-text">${text}</p>
    <p class="film-details__comment-info">
      <span class="film-details__comment-author">${author}</span>
      <span class="film-details__comment-day">${dayComment}</span>
      <button id=${id} class="film-details__comment-delete">Delete</button>
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
