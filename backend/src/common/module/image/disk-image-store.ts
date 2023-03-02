import { ImageStore } from '@common/module/image/image-store';
import { Injectable } from '@nestjs/common';
import { FileImageUploadConfiguration } from '@common/module/image/type/image-upload-configuration.interface';
import * as fs from 'fs';
import * as path from 'path';
import { UuidGenerator } from '@common/util/uuid-generator';
import { getExtensionFromMimeType } from '@common/util/getExtensionFromMimeType';

@Injectable()
export class DiskImageStore extends ImageStore {
  constructor(private readonly config: FileImageUploadConfiguration) {
    super();
  }

  async upload(file: Express.Multer.File): Promise<string> {
    const filePath = path.join(
      this.config.options.path,
      `${UuidGenerator.generate()}${getExtensionFromMimeType(file.mimetype)}`,
    );
    try {
      await fs.writeFileSync(filePath, file.buffer, { flag: 'w' });
    } catch (e) {
      throw new Error(`파일 저장에 실패했습니다.${e}`);
    }

    return filePath;
  }
}
