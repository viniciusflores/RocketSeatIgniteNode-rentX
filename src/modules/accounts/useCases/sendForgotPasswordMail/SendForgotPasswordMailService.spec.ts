import { UsersRepositoryMock } from '@modules/accounts/repositories/mocks/UsersRepositoryMock';
import { UsersTokenRepositoryMock } from '@modules/accounts/repositories/mocks/UsersTokenRepositoryMock';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { MailProviderMock } from '@shared/container/providers/MailProvider/mocks/MailProviderMock';
import { AppError } from '@shared/errors/AppError';

import { SendForgotPasswordMailService } from './SendForgotPasswordMailService';

let sendForgotPasswordMailService: SendForgotPasswordMailService;
let usersRespositoryMock: UsersRepositoryMock;
let usersTokensRepositoryMock: UsersTokenRepositoryMock;
let dateProvider: DayjsDateProvider;
let mailProviderMock: MailProviderMock;

describe('Send Forgot Mail', () => {
  beforeEach(() => {
    usersRespositoryMock = new UsersRepositoryMock();
    usersTokensRepositoryMock = new UsersTokenRepositoryMock();
    dateProvider = new DayjsDateProvider();
    mailProviderMock = new MailProviderMock();
    sendForgotPasswordMailService = new SendForgotPasswordMailService(
      usersRespositoryMock,
      usersTokensRepositoryMock,
      dateProvider,
      mailProviderMock,
    );
  });

  it('should be able to send a forgot password mail to user', async () => {
    const sendMail = spyOn(mailProviderMock, 'sendMail');

    await usersRespositoryMock.create({
      name: 'john doe',
      email: 'johndoe@example.com',
      password: '1234',
      driver_license: '123456',
    });

    await sendForgotPasswordMailService.execute('johndoe@example.com');

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to send an email if user does not exists', async () => {
    await expect(
      sendForgotPasswordMailService.execute('johndoe@example.com'),
    ).rejects.toEqual(new AppError('User does not exists!'));
  });

  it('should be able to create an users token', async () => {
    const generateTokenMail = spyOn(usersTokensRepositoryMock, 'create');

    await usersRespositoryMock.create({
      name: 'john doe',
      email: 'johndoe@example.com',
      password: '1234',
      driver_license: '123456',
    });

    await sendForgotPasswordMailService.execute('johndoe@example.com');

    expect(generateTokenMail).toHaveBeenCalled();
  });
});
