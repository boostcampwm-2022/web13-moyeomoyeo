import { ClassProvider, DynamicModule, Type } from '@nestjs/common';
import { ImageUploadConfiguration } from '@common/module/image/type/image-upload-configuration.interface';
import { ImageStore } from '@common/module/image/image-store';
import { S3ImageStore } from '@common/module/image/s3-image-store';
import { UploadStrategy } from '@common/module/image/enums/upload-strategy.enum';
import { FileImageStore } from '@common/module/image/file-image-store';

export class ImageModule {
  static register(config: ImageUploadConfiguration): DynamicModule {
    let imageStore: Type<ImageStore>;

    // TO DO: ImageFactory 로 분리
    switch (config.strategy) {
      case UploadStrategy.S3:
        imageStore = S3ImageStore;
        break;
      case UploadStrategy.FILE:
        imageStore = FileImageStore;
    }

    const imageStoreProvider: ClassProvider = {
      provide: ImageStore,
      useClass: imageStore,
    };

    return {
      module: ImageModule,
      providers: [imageStoreProvider],
      exports: [imageStoreProvider],
    };
  }
}
