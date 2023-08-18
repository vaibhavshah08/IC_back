import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports:[
    MulterModule.register({
      dest: './uploads', // Change the destination folder as needed
      limits: {
        fileSize: 1024 * 1024, // Set the file size limit (e.g., 1MB)
      },
    }),
  ],
  providers: [FileService],
  controllers: [FileController]
})
export class FileModule {}
