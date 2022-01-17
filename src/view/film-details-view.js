import he from 'he';
import { SmartView } from './smart-view';
import { EMOJIS } from '../const';
import { createCommentDetailsTemplate } from './comment-details-view';
import { getFilmDurationFormat, getFilmReleaseDateFormat } from '../utils/film';

const createEmojiImgTemplate = (emoji) => `<img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji-${emoji}">`;

const createAddCommentTemplate = (emoji, comment) => {
  const emojiImg = emoji ? createEmojiImgTemplate(emoji) : '';
  const newComment = comment ? comment : '';

  return `<div class="film-details__add-emoji-label">${emojiImg}</div>
    <label class="film-details__comment-label">
      <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${he.encode(newComment)}</textarea>
    </label>`;
};

const createEmojiListTemplate = (currentEmoji) => (
  EMOJIS.map((emoji) =>
    `<input
      class="film-details__emoji-item visually-hidden"
      name="comment-emoji"
      type="radio"
      id="emoji-${emoji}"
      value="${emoji}"
      ${currentEmoji === emoji ? 'checked' : ''}
      >
      <label class="film-details__emoji-label" for="emoji-${emoji}">
        ${createEmojiImgTemplate(emoji)}
      </label>`).join('')
);

const createFilmDetailsTemplate = (data) => {
  const {
    title,
    titleOriginal,
    rating,
    director,
    writers,
    actors,
    releaseDate,
    duration,
    poster,
    country,
    genres,
    description,
    comments,
    commentEmoji,
    commentInput
  } = data;

  // TODO: Вынести за шаблон
  const displayGenres = genres.map((genre) => `<span class="film-details__genre">${genre}</span>`).join('');

  const displayComments = comments.map((comment) => createCommentDetailsTemplate(comment)).join('');

  const displayTermGenre = genres.length > 1
    ? 's'
    : '';

  const emojiList = createEmojiListTemplate(commentEmoji);
  const addComment = createAddCommentTemplate(commentEmoji, commentInput);

  const runTime = getFilmDurationFormat(duration);
  const release = getFilmReleaseDateFormat(releaseDate);

  return `<section class="film-details">
              <form class="film-details__inner" action="" method="get">
                <div class="film-details__top-container">
                  <div class="film-details__close">
                    <button class="film-details__close-btn" type="button">close</button>
                  </div>
                  <div class="film-details__info-wrap">
                    <div class="film-details__poster">
                      <img class="film-details__poster-img" src=${poster} alt="">

                        <p class="film-details__age">18+</p>
                    </div>

                    <div class="film-details__info">
                      <div class="film-details__info-head">
                        <div class="film-details__title-wrap">
                          <h3 class="film-details__title">${title}</h3>
                          <p class="film-details__title-original">Original: ${titleOriginal}</p>
                        </div>

                        <div class="film-details__rating">
                          <p class="film-details__total-rating">${rating}</p>
                        </div>
                      </div>

                      <table class="film-details__table">
                        <tr class="film-details__row">
                          <td class="film-details__term">Director</td>
                          <td class="film-details__cell">${director}</td>
                        </tr>
                        <tr class="film-details__row">
                          <td class="film-details__term">Writers</td>
                          <td class="film-details__cell">${writers}</td>
                        </tr>
                        <tr class="film-details__row">
                          <td class="film-details__term">Actors</td>
                          <td class="film-details__cell">${actors}</td>
                        </tr>
                        <tr class="film-details__row">
                          <td class="film-details__term">Release Date</td>
                          <td class="film-details__cell">${release}</td>
                        </tr>
                        <tr class="film-details__row">
                          <td class="film-details__term">Runtime</td>
                          <td class="film-details__cell">${runTime}</td>
                        </tr>
                        <tr class="film-details__row">
                          <td class="film-details__term">Country</td>
                          <td class="film-details__cell">${country}</td>
                        </tr>
                        <tr class="film-details__row">
                          <td class="film-details__term">Genre${displayTermGenre}</td>
                          <td class="film-details__cell">
                            ${displayGenres}
                          </td>
                        </tr>
                      </table>

                      <p class="film-details__film-description">
                        ${description}
                      </p>
                    </div>
                  </div>

                  <section class="film-details__controls">
                    <button type="button" class="film-details__control-button film-details__control-button--watchlist" id="watchlist" name="watchlist">Add to watchlist</button>
                    <button type="button" class="film-details__control-button film-details__control-button--active film-details__control-button--watched" id="watched" name="watched">Already watched</button>
                    <button type="button" class="film-details__control-button film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button>
                  </section>
                </div>

                <div class="film-details__bottom-container">
                  <section class="film-details__comments-wrap">
                    <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

                    <ul class="film-details__comments-list">${displayComments}</ul>

                    <div class="film-details__new-comment">
                      ${addComment}
                      <div class="film-details__emoji-list">
                      ${emojiList}
                      </div>
                    </div>
                  </section>
                </div>
              </form>
            </section>`;
};

class FilmDetails extends SmartView {

  constructor(film) {
    super();
    this._data = FilmDetails.parseFilmToData(film);

    this.#setInnerHandlers();
  }

  #onClickEmoji = (evt) => {
    if (evt.target.tagName === 'INPUT') {
      evt.target.checked = true;
      this.updateData({ commentEmoji: evt.target.value });
    }
  };

  #onInputComment = (evt) => {
    evt.preventDefault();
    this.updateData({ commentInput: evt.target.value }, true);
  };

  #onScroll = (evt) => {
    evt.preventDefault();
    this.updateData({ scrollTop: evt.target.scrollTop }, true);
  };

  #setScrollPosition = () => {
    this.element.scrollTop = this._data.scrollTop;
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.film-details__emoji-list')
      .addEventListener('click', this.#onClickEmoji);

    this.element
      .querySelector('.film-details__comment-input')
      .addEventListener('input', this.#onInputComment);

    this.element
      .addEventListener('scroll', this.#onScroll);

    document.addEventListener('keydown', (evt) => {
      // эксперимент обработать событие ctrl + Enter для сохранения коментария
      evt.preventDefault();
      if (evt.ctrlKey && evt.key === 'Enter') {
        console.log('crtl + Enter !!!');
      }
    });
  };

  restoreHandlers = () => {
    this.#setInnerHandlers();
    this.#setScrollPosition();
    this.setCloseDetailsCardHandler(this._callback.closeDetails);
    this.setAddToWatchListHandler(this._callback.addToWatchList);
    this.setMarkAsWatchedHandler(this._callback.markAsWatched);
    this.setMarkAsFavoriteHandler(this._callback.setMarkAsFavoriteHandler);
    this.setDeleteCommentHandler(this._callback.deleteComment);
  };

  get template() {
    return createFilmDetailsTemplate(this._data);
  }

  reset = (film) => {
    this.updateData(
      FilmDetails.parseFilmToData(film),
    );
  }

  #onClose = () => {
    this._callback.closeDetails();
  };

  setCloseDetailsCardHandler = (calback) => {
    this._callback.closeDetails = calback;
    this.element
      .querySelector('.film-details__close-btn')
      .addEventListener('click', this.#onClose);
  };

  #onAddToWatchListClick = (evt) => {
    evt.preventDefault();
    this._callback.addToWatchList();
  };

  setAddToWatchListHandler = (callback) => {
    this._callback.addToWatchList = callback;
    this.element
      .querySelector('.film-details__control-button--watchlist')
      .addEventListener('click', this.#onAddToWatchListClick);
  };

  #onMarkAsWatchedClick = (evt) => {
    evt.preventDefault();
    this._callback.markAsWatched();
  };

  setMarkAsWatchedHandler = (callback) => {
    this._callback.markAsWatched = callback;
    this.element
      .querySelector('.film-details__control-button--watched')
      .addEventListener('click', this.#onMarkAsWatchedClick);
  };

  #onMarkAsFavoriteClick = (evt) => {
    evt.preventDefault();
    this._callback.markAsFavorite();
  };

  setMarkAsFavoriteHandler = (callback) => {
    this._callback.markAsFavorite = callback;
    this.element
      .querySelector('.film-details__control-button--favorite')
      .addEventListener('click', this.#onMarkAsFavoriteClick);
  };

  #onCommentDelete = (evt) => {
    evt.preventDefault();
    this._callback.deleteComment(evt.target.id);
  };

  setDeleteCommentHandler = (callback) => {
    this._callback.deleteComment = callback;
    this.element
      .querySelector('.film-details__comments-list')
      .addEventListener('click', this.#onCommentDelete);
  };

  static parseFilmToData = (film) => ({
    ...film,
    commentEmoji: null,
    commentInput: null,
    scrollTop: 0,
  });

}

export { FilmDetails };
