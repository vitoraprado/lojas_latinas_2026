export function sendResponse(response, statusCode, data = null, message = null) {
  return response.status(statusCode).json({
    success: statusCode < 400,
    message,
    data
  });
}