import { UploadStrategy } from '@common/module/image/enums/upload-strategy.enum';

export type ImageUploadConfiguration =
  | S3ImageUploadConfiguration
  | FileImageUploadConfiguration;

export interface S3ImageUploadConfiguration {
  strategy: UploadStrategy.S3;

  // TO DO: S3 option 정하기
}

export interface FileImageUploadConfiguration {
  strategy: UploadStrategy.FILE;

  options: {
    path?: string;
  };
}

export type ImageUploadOptions = CommonUploadOptions;

export interface CommonUploadOptions {
  filePath: string;

  fileData: Buffer;

  mimeType: string;
}
