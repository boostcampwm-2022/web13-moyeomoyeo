import { ImageStore } from '@common/module/image/image-store';
import { Injectable } from '@nestjs/common';
import { FileImageUploadConfiguration } from '@common/module/image/type/image-upload-configuration.interface';
import * as fs from 'fs';
import * as path from 'path';
import { UuidGenerator } from '@common/util/uuid-generator';

@Injectable()
export class FileImageStore extends ImageStore {
  constructor(private readonly config: FileImageUploadConfiguration) {
    super();
  }

  async upload(file: Express.Multer.File): Promise<string> {
    const filePath = path.join(
      this.config.options.path,
      `${UuidGenerator.generate()}${this.getExtension(file.mimetype)}`,
    );
    try {
      await fs.writeFileSync(filePath, file.buffer, { flag: 'w' });
    } catch (e) {
      throw new Error(`파일 저장에 실패했습니다.${e}`);
    }

    return filePath;
  }

  getExtension(mimetype: string): string {
    switch (mimetype) {
      case 'image/jpeg':
        return '.jpg';
      case 'image/png':
        return '.png';
      case 'image/gif':
        return '.gif';
      case 'image/webp':
        return '.webp';
      case 'image/tiff':
        return '.tif';
      case 'application/pdf':
        return '.pdf';
      case 'application/msword':
        return '.doc';
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return '.docx';
      case 'application/vnd.ms-excel':
        return '.xls';
      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        return '.xlsx';
      case 'application/vnd.ms-powerpoint':
        return '.ppt';
      case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
        return '.pptx';
      default:
        return '';
    }
  }
}
