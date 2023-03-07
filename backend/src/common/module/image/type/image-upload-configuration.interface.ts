import { UploadStrategy } from '@common/module/image/enums/upload-strategy.enum';

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
  };
}

export interface FileImageUploadConfiguration {
  strategy: UploadStrategy.DISK;

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
