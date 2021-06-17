import { Router } from 'express';

import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';
import { DevolutionRentalController } from '@modules/rentals/useCases/devolutionRental/DevolutionRentalController';
import { ListRentalByUserController } from '@modules/rentals/useCases/listRentalByUser/ListRentalByUserController';
import { ensureAuthenticate } from '@shared/infra/http/middlewares/ensureAuthenticate';

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalByUserController = new ListRentalByUserController();

rentalRoutes.post('/', ensureAuthenticate, createRentalController.handle);
rentalRoutes.post(
  '/devolution/:id',
  ensureAuthenticate,
  devolutionRentalController.handle,
);
rentalRoutes.get(
  '/user',
  ensureAuthenticate,
  listRentalByUserController.handle,
);

export { rentalRoutes };
