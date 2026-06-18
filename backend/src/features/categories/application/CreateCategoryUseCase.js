import { requiredFields } from '../../../shared/validators/requiredFields.js';
import { Category } from '../domain/Category.js';

export class CreateCategoryUseCase {
  constructor(categoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async execute(payload) {
    requiredFields(payload, ['name']);

    const category = new Category({
      name: payload.name,
      description: payload.description
    });

    return this.categoryRepository.create(category);
  }
}