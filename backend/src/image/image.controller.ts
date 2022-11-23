import {
  Controller,
  HttpStatus,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiErrorResponse } from '@src/common/decorator/api-error-response.decorator';
import { ApiSuccessResponse } from '@src/common/decorator/api-success-resposne.decorator';
import { ImageService } from './image.service';

@Controller('images')
export class ImageController {
  constructor(private imageService: ImageService) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('file'))
  @ApiSuccessResponse(HttpStatus.OK, String)
  @ApiErrorResponse()
  uploadImage(@UploadedFiles() file: Express.Multer.File) {
    return this.imageService.uploadImage(file);
  }
}
