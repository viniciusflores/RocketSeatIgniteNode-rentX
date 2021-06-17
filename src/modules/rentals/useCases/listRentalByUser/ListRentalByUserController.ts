import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListRentalByUserService } from './ListRentalByUserService';

class ListRentalByUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const listRentalByUserService = container.resolve(ListRentalByUserService);

    const rentals = await listRentalByUserService.execute(id);

    return response.json(rentals);
  }
}

export { ListRentalByUserController };
