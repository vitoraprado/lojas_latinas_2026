import { AppError } from '../../../shared/errors/AppError.js';
import bcrypt from 'bcrypt';

export class LoginUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(email, password, expectedUserType) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Usuário não encontrado', 404);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new AppError('Senha inválida', 401);
    }

    if (expectedUserType && user.user_type !== expectedUserType) {
      throw new AppError('Usuário sem permissão para este acesso', 403);
    }

    return user;
  }
}