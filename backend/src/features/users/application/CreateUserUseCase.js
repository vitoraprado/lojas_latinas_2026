import { requiredFields } from '../../../shared/validators/requiredFields.js';
import { User } from '../domain/User.js';

export class CreateUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(payload) {
    requiredFields(payload, ['name', 'user_type', 'email', 'password']);

    const user = new User({
      name: payload.name,
      user_type: payload.user_type,
      email: payload.email,
      password: payload.password
    });

    return this.userRepository.create(user);
  }
}