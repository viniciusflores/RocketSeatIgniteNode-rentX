import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserService } from '@modules/accounts/useCases/createUser/CreateUserService';

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password, driver_license } = request.body;
    const createUserUseService = container.resolve(CreateUserService);

    await createUserUseService.execute({
      name,
      email,
      password,
      driver_license,
    });

    return response.status(201).send();
  }
}

export { CreateUserController };
