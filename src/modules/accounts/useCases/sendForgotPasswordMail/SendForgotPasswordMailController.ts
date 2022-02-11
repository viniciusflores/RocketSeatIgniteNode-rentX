import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { SendForgotPasswordMailService } from './SendForgotPasswordMailService';

class SendForgotPasswordMailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;
    const sendForgotPasswordMailService = container.resolve(
      SendForgotPasswordMailService,
    );

    await sendForgotPasswordMailService.execute(email);

    return response.send();
  }
}

export { SendForgotPasswordMailController };
