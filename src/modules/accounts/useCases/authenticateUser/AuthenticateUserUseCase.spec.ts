import { AppError } from '../../../../errors/AppError';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { UsersRepositoryMock } from '../../repositories/mocks/UsersRepositoryMock';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryMock: UsersRepositoryMock;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryMock = new UsersRepositoryMock();
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryMock);
    createUserUseCase = new CreateUserUseCase(usersRepositoryMock);
  });

  it('should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      driver_license: '1234567890',
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
  });

  it('should not be able to authenticate an nonexistent user', () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'wrong-mail@example.com',
        password: 'wrong-password',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with a incorrect password', () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
        driver_license: '1234567890',
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: 'wrong-password',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
