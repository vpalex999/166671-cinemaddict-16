import { createElement } from '../render';

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

class CommentDetails {
  #element = null;
  #comment = null;

  constructor(comment) {
    this.#comment = comment;
  }

  get template() {
    return this.#comment
      ? createCommentDetailsTemplate(this.#comment)
      : this.#comment;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}

export { createCommentDetailsTemplate, CommentDetails };
