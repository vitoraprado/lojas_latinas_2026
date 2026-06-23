import { requiredFields } from '../../../shared/validators/requiredFields.js';
import { User } from '../domain/User.js';
import bcrypt from 'bcrypt';

export class CreateUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(payload) {
    requiredFields(payload, ['name', 'user_type', 'email', 'password']);

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(payload.password, saltRounds);

    const user = new User({
      name: payload.name,
      user_type: payload.user_type,
      email: payload.email,
      password: hashedPassword
    });

    return this.userRepository.create(user);
  }
}