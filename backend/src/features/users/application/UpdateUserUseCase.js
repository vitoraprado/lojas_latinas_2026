import { requiredFields } from '../../../shared/validators/requiredFields.js';
import { AppError } from '../../../shared/errors/AppError.js';

export class UpdateUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(id, payload) {
    requiredFields(payload, ['name']);

    const exists = await this.userRepository.findById(id);

    if (!exists) {
      throw new AppError('Usuário não encontrado', 404);
    }

    return this.userRepository.update(id, payload);
  }
}