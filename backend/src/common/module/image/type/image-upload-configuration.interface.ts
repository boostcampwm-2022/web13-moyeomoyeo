import { UploadStrategy } from '@common/module/image/enums/upload-strategy.enum';
import { ModuleMetadata, Type } from '@nestjs/common';

export type ImageUploadConfiguration =
  | S3ImageUploadConfiguration
  | FileImageUploadConfiguration;

export interface S3ImageUploadConfiguration {
  strategy: UploadStrategy.S3;

  options: {
    region: string;
    credentials: {
      secretAccessKey: string;
      accessKeyId: string;
    };
    bucket: string;
    acl: string;
    path?: string;
    endpoint?: string;
    forcePathStyle?: boolean;
  };
}

export interface FileImageUploadConfiguration {
  strategy: UploadStrategy.DISK;

  options: {
    path?: string;
  };
}

export interface ImageUploadConfigurationFactory {
  createImageConfigurations():
    | Promise<ImageUploadConfiguration>
    | ImageUploadConfiguration;
}

export interface ImageModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<ImageUploadConfiguration>;
  useClass?: Type<ImageUploadConfiguration>;
  useFactory?: (
    ...args: any[]
  ) => Promise<ImageUploadConfiguration> | ImageUploadConfiguration;
  inject?: any[];
}
