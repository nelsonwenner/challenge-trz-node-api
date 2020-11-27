class AppError {
  public readonly error: string;

  public readonly code: number;

  constructor(message: string, statusCode = 400) {
    this.error = message;
    this.code = statusCode;
  }
}

export default AppError;
