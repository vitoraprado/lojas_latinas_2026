import { AppError } from '../../../shared/errors/AppError.js';

export class DeleteUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(id) {
    const exists = await this.userRepository.findById(id);

    if (!exists) {
      throw new AppError('Produto não encontrado', 404);
    }

    await this.userRepository.delete(id);
    return true;
  }
}