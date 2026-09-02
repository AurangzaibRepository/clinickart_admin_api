import { FileInterceptor } from '@nestjs/platform-express';
import { BadRequestException } from '@nestjs/common';

export function ExcelUploadInterceptor() {
  return FileInterceptor('file', {
    limits: {
      fileSize: 5 * 1024 * 1024,
    },
    fileFilter: (req, file, callback) => {
      if (
        file.mimetype ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ) {
        callback(null, true);
      } else {
        callback(
          new BadRequestException('Only .xlsx files are allowed'),
          false,
        );
      }
    },
  });
}
