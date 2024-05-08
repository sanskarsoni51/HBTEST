class AppError extends Error {
    statusCode: number;
    status: string;
    isOperational: boolean;
    code?: number;
  
    constructor(message: string, statusCode: number) {
      super(message);
  
      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'; // Corrected 'errors' to 'error'
      this.isOperational = true;
  
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  export default AppError;
  