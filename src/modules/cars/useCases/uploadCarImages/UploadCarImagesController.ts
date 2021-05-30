import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UploadCarImagesService } from './UploadCarImagesService';

interface IFiles {
  filename: string;
}

class UploadCarsImageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const images = request.files as IFiles[];

    const uploadCarImagesService = container.resolve(UploadCarImagesService);

    const images_name = images.map((file) => file.filename);

    await uploadCarImagesService.execute({
      car_id: id,
      images_name,
    });

    return response.status(201).send();
  }
}

export { UploadCarsImageController };
