import { AppError } from '../../../shared/errors/AppError.js';

export class LoginUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(email, password, expectedUserType) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Usuário não encontrado', 404);
    }

    if (user.password !== password) {
    throw new AppError('Senha inválida');
    }

    if (expectedUserType && user.user_type !== expectedUserType) {
        throw new AppError('Usuário sem permissão para este acesso');
    }

    return user;
  }
}