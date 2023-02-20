import { ImageStore } from '@common/module/image/image-store';

export class FileImageStore extends ImageStore {
  async upload(file: Express.Multer.File): Promise<string> {
    return '';
  }
}
