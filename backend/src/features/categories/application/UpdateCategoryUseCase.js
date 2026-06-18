import { requiredFields } from '../../../shared/validators/requiredFields.js';
import { AppError } from '../../../shared/errors/AppError.js';

export class UpdateCategoryUseCase {
  constructor(categoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async execute(id, payload) {
    requiredFields(payload, ['name']);

    const exists = await this.categoryRepository.findById(id);

    if (!exists) {
      throw new AppError('Categoria não encontrada', 404);
    }

    return this.categoryRepository.update(id, payload);
  }
}