import { Router } from 'express';

import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';
import { ensureAuthenticate } from '@shared/infra/http/middlewares/ensureAuthenticate';

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();

rentalRoutes.post('/', ensureAuthenticate, createRentalController.handle);

export { rentalRoutes };
