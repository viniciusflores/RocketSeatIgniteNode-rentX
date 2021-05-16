import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';
import { ensureAuthenticate } from '../middlewares/ensureAuthenticate';
import { CreateUserController } from '../modules/accounts/useCases/createUser/CreateUserController';
import { UpdateUserAvatarController } from '../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController';

const usersRoutes = Router();

const uploadAvatarConfig = multer(uploadConfig.upload('./tmp/avatar'));

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post('/', createUserController.handle);

usersRoutes.patch(
  '/avatar',
  ensureAuthenticate,
  uploadAvatarConfig.single('avatar'),
  updateUserAvatarController.handle,
);

export { usersRoutes };
