
class ErrorHandler extends Error {

    statusCode: number;
  
    constructor(message: string, statusCode: number) {
      super(message);
  
      this.statusCode = statusCode;
  
      ErrorHandler.captureStackTrace(this, this.constructor);
    }
  }

export default ErrorHandler;