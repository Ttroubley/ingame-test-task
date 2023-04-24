import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';

export const FileUploadInterceptor = FileInterceptor('file', {
  storage: diskStorage({
    destination: './bookFiles',
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + '-' + file.originalname);
    },
  }),
});
