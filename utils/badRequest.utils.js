class BadRequestError extends ApiError {
  constructor(message = 'Bad request') {
    super(400, message);
  }
}