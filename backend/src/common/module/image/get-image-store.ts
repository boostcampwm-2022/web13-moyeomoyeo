import { ImageUploadConfiguration } from '@common/module/image/type/image-upload-configuration.interface';
import { ImageStore } from '@common/module/image/image-store';
import { UploadStrategy } from '@common/module/image/enums/upload-strategy.enum';
import { S3ImageStore } from '@common/module/image/s3-image-store';
import { DiskImageStore } from '@common/module/image/disk-image-store';

export const getImageStore = (config: ImageUploadConfiguration): ImageStore => {
  switch (config.strategy) {
    case UploadStrategy.S3:
      return new S3ImageStore(config);

    case UploadStrategy.DISK:
      return new DiskImageStore(config);

    default:
      return unknownUploadStrategy(config);
  }
};

function unknownUploadStrategy(config: never): never {
  throw new Error(`Unknown Upload Strategy: ${JSON.stringify(config)}`);
}
