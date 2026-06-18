import { sendResponse } from '../../../shared/http/sendResponse.js';
import { UserRepository } from '../infraestructure/user.repository.js';
import { CreateUserUseCase } from '../application/CreateUserUseCase.js';
import { ListUsersUseCase } from '../application/ListUsersUseCase.js';
import { GetUserUseCase } from '../application/GetUserUseCase.js';
import { UpdateUserUseCase } from '../application/UpdateUserUseCase.js';
import { DeleteUserUseCase } from '../application/DeleteUserUseCase.js';
import { LoginUserUseCase } from '../application/LoginUserUseCase.js';

const repository = new UserRepository();

export class UserController {
  async index(request, response, next) {
    try {
      const useCase = new ListUsersUseCase(repository);
      const users = await useCase.execute();
      return sendResponse(response, 200, users);
    } catch (error) {
      next(error);
    }
  }

  async show(request, response, next) {
    try {
      const useCase = new GetUserUseCase(repository);
      const user = await useCase.execute(request.params.id);
      return sendResponse(response, 200, user);
    } catch (error) {
      next(error);
    }
  }

  async store(request, response, next) {
    try {
      const useCase = new CreateUserUseCase(repository);
      const user = await useCase.execute(request.body);
      return sendResponse(response, 201, user, 'Usuário criado com sucesso');
    } catch (error) {
      next(error);
    }
  }

  async update(request, response, next) {
    try {
      const useCase = new UpdateUserUseCase(repository);
      const user = await useCase.execute(request.params.id, request.body);
      return sendResponse(response, 200, user, 'Usuário atualizado com sucesso');
    } catch (error) {
      next(error);
    }
  }

  async delete(request, response, next) {
    try {
      const useCase = new DeleteUserUseCase(repository);
      await useCase.execute(request.params.id);
      return sendResponse(response, 200, null, 'Usuário removido com sucesso');
    } catch (error) {
      next(error);
    }
  }

  async login(request, response, next) {
    try {
      const useCase = new LoginUserUseCase(repository);
      const user = await useCase.execute(request.body.email, request.body.password, request.body.user_type);
      return sendResponse(response, 200, user, 'Login realizado com sucesso');
    } catch (error) {
      next(error);
    }
  }
}