import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';

export function UploadInterceptor(folder: string) {
  return FileInterceptor('image', {
    storage: diskStorage({
      destination: (req, file, callback) => {
        const uploadPath = `./uploads/${folder}`;

        if (!fs.existsSync(uploadPath)) {
          fs.mkdirSync(uploadPath, { recursive: true });
        }

        callback(null, uploadPath);
      },
      filename: (req, file, callback) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;

        callback(null, uniqueName + extname(file.originalname));
      },
    }),
  });
}
