import { DynamicModule, FactoryProvider, Provider } from '@nestjs/common';
import {
  ImageModuleAsyncOptions,
  ImageUploadConfiguration,
  ImageUploadConfigurationFactory,
} from '@common/module/image/type/image-upload-configuration.interface';
import { ImageStore } from '@common/module/image/image-store';
import { getImageStore } from '@common/module/image/get-image-store';
import { IMAGE_UPLOAD_CONFIGURATION } from '@common/module/image/constants';

export class ImageModule {
  private static imageStoreProvider: FactoryProvider<ImageStore> = {
    provide: ImageStore,
    useFactory: (config: ImageUploadConfiguration) => {
      return getImageStore(config);
    },
    inject: [IMAGE_UPLOAD_CONFIGURATION],
  };

  static register(config: ImageUploadConfiguration): DynamicModule {
    return {
      module: ImageModule,
      providers: [
        this.imageStoreProvider,
        { provide: IMAGE_UPLOAD_CONFIGURATION, useValue: config },
      ],
      exports: [this.imageStoreProvider],
    };
  }

  static registerAsync(options: ImageModuleAsyncOptions): DynamicModule {
    const providers = this.createAsyncProviders(options);
    return {
      module: ImageModule,
      imports: options.imports,
      providers: [this.imageStoreProvider, ...providers],
      exports: [this.imageStoreProvider],
    };
  }

  private static createAsyncProviders(
    options: ImageModuleAsyncOptions,
  ): Provider<ImageUploadConfiguration>[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncImageConfigurationProviders(options)];
    }

    return [
      this.createAsyncImageConfigurationProviders(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createAsyncImageConfigurationProviders(
    options: ImageModuleAsyncOptions,
  ): Provider<ImageUploadConfiguration> {
    if (options.useFactory) {
      return {
        provide: IMAGE_UPLOAD_CONFIGURATION,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    return {
      provide: IMAGE_UPLOAD_CONFIGURATION,
      useFactory: async (
        imageUploadConfigurationFactory: ImageUploadConfigurationFactory,
      ) => imageUploadConfigurationFactory.createImageConfigurations(),
      inject: [options.useExisting || options.useClass],
    };
  }
}
