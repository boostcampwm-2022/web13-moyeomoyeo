import { ImageStore } from '@common/module/image/image-store';

export class S3ImageStore extends ImageStore {
  async upload(File: Express.Multer.File): Promise<string> {
    return '';
  }
}
