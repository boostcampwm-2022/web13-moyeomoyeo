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
import { ResponseEntity } from '@src/common/response-entity';
import { ImagesUploadResponse } from './dto/images-upload-response.dto';
import { ImageService } from './image.service';

@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  @ApiSuccessResponse(HttpStatus.CREATED, ImagesUploadResponse)
  async uploadImage(@UploadedFiles() files: Array<Express.Multer.File>) {
    const { keyList, urlList } = this.imageService.uploadImage(files);
    const data = keyList.map(
      (key, index) => new ImagesUploadResponse(key, urlList[index]),
    );
    return ResponseEntity.CREATED_WITH_DATA(data);
  }
}
