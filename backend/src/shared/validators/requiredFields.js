import { AppError } from '../errors/AppError.js';

export function requiredFields(payload, fields) {
  const missingFields = fields.filter((field) => {
    const value = payload[field];
    return value === undefined || value === null || value === '';
  });

  if (missingFields.length > 0) {
    throw new AppError(`Campos obrigatórios ausentes: ${missingFields.join(', ')}`, 422);
  }
}