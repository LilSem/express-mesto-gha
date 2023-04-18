class InternalServerError extends Error {
  constructor() {
    super();
    this.statusCode = 500;
  }
}

module.exports = { InternalServerError };