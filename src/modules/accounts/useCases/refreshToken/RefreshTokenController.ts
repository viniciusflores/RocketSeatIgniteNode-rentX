import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { RefreshTokensService } from './RefreshTokenService';

class RefreshTokensController {
  async handle(request: Request, response: Response): Promise<Response> {
    const token =
      request.body.token ||
      request.headers['x-access-token'] ||
      request.query.token;

    const refreshTokenService = container.resolve(RefreshTokensService);

    const refreshToken = await refreshTokenService.execute(token);

    return response.json(refreshToken);
  }
}

export { RefreshTokensController };
