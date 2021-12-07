class Abstract {
  constructor() {
    if (new.target === Abstract) {
      throw new Error('Can\'t instantiate AbstractView, only concrete one.');
    }
  }
}

export { Abstract };
