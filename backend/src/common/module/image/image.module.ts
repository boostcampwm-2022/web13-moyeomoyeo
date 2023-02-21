import { DynamicModule, ValueProvider } from '@nestjs/common';
import { ImageUploadConfiguration } from '@common/module/image/type/image-upload-configuration.interface';
import { ImageStore } from '@common/module/image/image-store';
import { S3ImageStore } from '@common/module/image/s3-image-store';
import { UploadStrategy } from '@common/module/image/enums/upload-strategy.enum';
import { FileImageStore } from '@common/module/image/file-image-store';

export class ImageModule {
  static register(config: ImageUploadConfiguration): DynamicModule {
    let imageStore: ImageStore;

    // TO DO: ImageFactory 로 분리
    switch (config.strategy) {
      case UploadStrategy.S3:
        imageStore = new S3ImageStore(config);
        break;
      case UploadStrategy.FILE:
        imageStore = new FileImageStore(config);
    }

    const imageStoreProvider: ValueProvider = {
      provide: ImageStore,
      useValue: imageStore,
    };

    return {
      module: ImageModule,
      providers: [imageStoreProvider],
      exports: [imageStoreProvider],
    };
  }
}
