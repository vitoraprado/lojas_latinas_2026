import { AppError } from '../../../shared/errors/AppError.js';

export class GetCategoryUseCase {
  constructor(categoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async execute(id) {
    const category = await this.categoryRepository.findById(id);

    if (!category) {
      throw new AppError('Categoria não encontrada', 404);
    }

    return category;
  }
}