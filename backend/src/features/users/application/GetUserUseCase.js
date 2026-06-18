import { AppError } from '../../../shared/errors/AppError.js';

export class GetUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(id) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError('Usuário não encontrado', 404);
    }

    return user;
  }
}