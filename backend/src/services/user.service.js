import * as repository from '../repositories/user.repository.js';

export async function login(email, password, expectedUserType) {
  const user = await repository.findByEmail(email);

  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  if (user.password !== password) {
    throw new Error('Senha inválida');
  }

  if (user.user_type !== expectedUserType) {
    throw new Error('Usuário sem permissão para este acesso');
  }

  return {
    id: user.id,
    name: user.name,
    user_type: user.user_type
  };
}