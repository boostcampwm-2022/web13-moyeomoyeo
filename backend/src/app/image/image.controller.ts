import {
  Controller,
  HttpStatus,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ApiSuccessResponse } from '@src/common/decorator/api-success-resposne.decorator';
import { ResponseEntity } from '@src/common/response-entity';
import { ImagesUploadResponse } from '@app/image/dto/images-upload-response.dto';
import { ImageService } from '@app/image/image.service';

@Controller('images')
@ApiTags('Image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('upload')
  @ApiSuccessResponse(HttpStatus.CREATED, ImagesUploadResponse)
  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  async uploadImage(@UploadedFiles() files: Array<Express.Multer.File>) {
    const { keyList, urlList } = this.imageService.uploadImage(files);
    const data = keyList.map(
      (key, index) => new ImagesUploadResponse(key, urlList[index]),
    );
    return ResponseEntity.CREATED_WITH_DATA(data);
  }
}
