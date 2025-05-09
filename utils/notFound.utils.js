class NotFoundError extends ApiError {
  constructor(message = 'Resource not found') {
    super(404, message);
  }
}