import { SmartView } from './smart-view';
import { createCommentDetailsTemplate } from './comment-details-view';

const createEmojiImgTemplate = (emojiName) => emojiName ? `<img src="./images/emoji/${emojiName}.png" width="30" height="30" alt="emoji">` : '';

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
    newEmoji,
    newComment
  } = data;

  const displayGenres = genres.map((genre) => `<span class="film-details__genre">${genre}</span>`).join('');

  const displayComments = comments.map((comment) => createCommentDetailsTemplate(comment)).join('');

  const displayTermGenre = genres.length > 1
    ? 's'
    : '';

  const newEmojiImg = createEmojiImgTemplate(newEmoji);
  const newCommentValue = newComment ? newComment : '';

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
              <td class="film-details__cell">${releaseDate}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${duration}</td>
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
          <div class="film-details__add-emoji-label">${newEmojiImg}</div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${newCommentValue}</textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
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

    const filmDetailsEmojiList = this.element.querySelector('.film-details__emoji-list');
    filmDetailsEmojiList.addEventListener('click', (evt) => {
      // evt.preventDefault();
      if (evt.target.tagName === 'INPUT') {
        this.updateData({ newEmoji: evt.target.value });
      }
    });

    this.element
      .querySelector('.film-details__comment-input')
      .addEventListener('click', (evt) => {
        this.updateData({newComment: evt.target.value}, true);
      });
  }

  restoreHandlers = () => {
    // throw new Error('Absctract method not implemented: restoreHandlers');
  };

  get template() {
    return createFilmDetailsTemplate(this._data);
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

  static parseFilmToData = (film) => ({
    ...film,
    newEmoji: null,
    newComment: null,
  });

}

export { FilmDetails };
