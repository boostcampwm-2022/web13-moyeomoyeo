import { DynamicModule, ValueProvider } from '@nestjs/common';
import { ImageUploadConfiguration } from '@common/module/image/type/image-upload-configuration.interface';
import { ImageStore } from '@common/module/image/image-store';
import { getImageStore } from '@common/module/image/get-image-store';

export class ImageModule {
  static register(config: ImageUploadConfiguration): DynamicModule {
    const imageStoreProvider: ValueProvider<ImageStore> = {
      provide: ImageStore,
      useValue: getImageStore(config),
    };

    return {
      module: ImageModule,
      providers: [imageStoreProvider],
      exports: [imageStoreProvider],
    };
  }
}
