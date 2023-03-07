import { ImageStore } from '@common/module/image/image-store';
import { S3ImageUploadConfiguration } from '@common/module/image/type/image-upload-configuration.interface';
import { HttpStatus, Injectable } from '@nestjs/common';
import path from 'path';
import { UuidGenerator } from '@common/util/uuid-generator';
import { getExtensionFromMimeType } from '@common/util/getExtensionFromMimeType';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class S3ImageStore extends ImageStore {
  constructor(
    private readonly config: S3ImageUploadConfiguration,
    private readonly s3Client: S3Client,
  ) {
    super();
  }

  async upload(file: Express.Multer.File): Promise<string> {
    const key = path.join(
      this.config.options.path,
      `${UuidGenerator.generate()}${getExtensionFromMimeType(file.mimetype)}`,
    );

    try {
      const response = await this.s3Client.send(
        new PutObjectCommand({
          Bucket: this.config.options.bucket,
          Key: key,
        }),
      );

      if (response.$metadata.httpStatusCode !== HttpStatus.OK) {
        throw new Error(
          `status: ${response.$metadata.httpStatusCode} requestId: ${response.$metadata.requestId}`,
        );
      }

      return key;
    } catch (e) {
      throw new Error(`파일 저장에 실패했습니다.${e}`);
    }
  }
}
