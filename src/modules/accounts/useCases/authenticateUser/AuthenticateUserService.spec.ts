import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UsersRepositoryMock } from '@modules/accounts/repositories/mocks/UsersRepositoryMock';
import { UsersTokenRepositoryMock } from '@modules/accounts/repositories/mocks/UsersTokenRepositoryMock';
import { AuthenticateUserService } from '@modules/accounts/useCases/authenticateUser/AuthenticateUserService';
import { CreateUserService } from '@modules/accounts/useCases/createUser/CreateUserService';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';

let authenticateUserService: AuthenticateUserService;
let usersRepositoryMock: UsersRepositoryMock;
let createUserUseCase: CreateUserService;
let usersTokensRepositoryMock: UsersTokenRepositoryMock;
let dateProvider: DayjsDateProvider;

describe('Authenticate User', () => {
  beforeEach(() => {
    dateProvider = new DayjsDateProvider();
    usersRepositoryMock = new UsersRepositoryMock();
    usersTokensRepositoryMock = new UsersTokenRepositoryMock();
    authenticateUserService = new AuthenticateUserService(
      usersRepositoryMock,
      usersTokensRepositoryMock,
      dateProvider,
    );
    createUserUseCase = new CreateUserService(usersRepositoryMock);
  });

  it('should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      driver_license: '1234567890',
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserService.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
  });

  it('should not be able to authenticate an nonexistent user', () => {
    expect(async () => {
      await authenticateUserService.execute({
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

      await authenticateUserService.execute({
        email: user.email,
        password: 'wrong-password',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
