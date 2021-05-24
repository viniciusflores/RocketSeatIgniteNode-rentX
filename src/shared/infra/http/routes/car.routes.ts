import { Router } from 'express';

import { CreateCarController } from '@modules/cars/useCases/createCars/CreateCarController';
import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';
import { ensureAuthenticate } from '@shared/infra/http/middlewares/ensureAuthenticate';

const carRoutes = Router();

const createCarController = new CreateCarController();

carRoutes.post(
  '/',
  ensureAuthenticate,
  ensureAdmin,
  createCarController.handle,
);

export { carRoutes };
