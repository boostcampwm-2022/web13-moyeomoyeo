import { ImageStore } from '@common/module/image/image-store';
import { S3ImageUploadConfiguration } from '@common/module/image/type/image-upload-configuration.interface';

export class S3ImageStore extends ImageStore {
  constructor(private readonly config: S3ImageUploadConfiguration) {
    super();
  }

  async upload(File: Express.Multer.File): Promise<string> {
    return '';
  }
}
