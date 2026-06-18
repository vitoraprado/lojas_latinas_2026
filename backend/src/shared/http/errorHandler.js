import { AppError } from '../errors/AppError.js';

export function wrap(handler) {
  return (req, res) =>
    Promise.resolve(handler(req, res))
      .catch((err) => {
        console.error(err);
        res.status(500).json({
          ERROR: 'Internal error',
          DETAILS: String(err.message || err)
        });
      });
}

export function errorHandler(error, request, response, next) {
  console.error(error);

  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      success: false,
      message: error.message,
      data: null
    });
  }

  return response.status(500).json({
    success: false,
    message: 'Erro interno no servidor',
    data: null
  });
}