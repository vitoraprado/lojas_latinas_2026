import { AppError } from '../../../shared/errors/AppError.js';

export class DeleteCategoryUseCase {
  constructor(categoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async execute(id) {
    const exists = await this.categoryRepository.findById(id);

    if (!exists) {
      throw new AppError('Categoria não encontrada', 404);
    }

    await this.categoryRepository.remove(id);
    return true;
  }
}