

class MoviesModel {
  #films = [];

  set films(films) {
    this.#films = [...films];
  }

  get films() {
    return this.#films;
  }

  updateFilm = (updatedFilm) => {
    this.#films = this.#films.map((film) => film.id === updatedFilm.id ? updatedFilm : film);
  };
}


export { MoviesModel };
