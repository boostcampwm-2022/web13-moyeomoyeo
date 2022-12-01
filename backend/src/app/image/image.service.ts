import { Injectable, Logger } from '@nestjs/common';
import { S3ConfigService } from '@src/common/config/s3/config.service';
import { Endpoint, S3 } from 'aws-sdk';
import * as path from 'path';
import { v4 } from 'uuid';

@Injectable()
export class ImageService {
  private readonly logger = new Logger(ImageService.name);
  private readonly s3: S3;

  constructor(private readonly s3ConfigService: S3ConfigService) {
    this.s3 = this.certificateS3();
  }

  async uploadImage(files: Array<Express.Multer.File>) {
    const keyList = await this.pushImageAndGetKey(files);
    const urlList = this.getStorageUrl(keyList);
    return { keyList, urlList };
  }

  certificateS3() {
    const endpoint = new Endpoint(this.s3ConfigService.endpoint);
    const s3 = new S3({
      endpoint: endpoint,
      region: this.s3ConfigService.region,
      credentials: {
        accessKeyId: this.s3ConfigService.accessKey,
        secretAccessKey: this.s3ConfigService.secretKey,
      },
    });

    return s3;
  }

  async pushImageAndGetKey(files: Express.Multer.File[]) {
    const keyList = [];

    const uploadFiles = files.map(async (file) => {
      const extension = this.findImageExtension(file.originalname);
      if (extension.length === 0) return;

      const key = path.join(
        this.s3ConfigService.path,
        `${new Date().getTime()}-${v4()}${extension}`,
      );

      await this.uploadImageToS3(file, key);
      keyList.push(key);
    });

    await Promise.all(uploadFiles);
    return keyList;
  }

  findImageExtension(fileName: string) {
    const regex = /(\.gif|\.jpg|\.jpeg|\.png|\.webp)$/gi;
    const result = fileName.match(regex);
    return result === null ? '' : result[0];
  }

  async uploadImageToS3(file: Express.Multer.File, key: string) {
    return await this.s3
      .upload({
        Bucket: this.s3ConfigService.bucket,
        Key: key,
        Body: file.buffer,
        ACL: 'public-read',
      })
      .promise();
  }

  getStorageUrl(keyList: string[]) {
    return keyList.map((key) => {
      return path.join(
        this.s3ConfigService.endpoint,
        this.s3ConfigService.bucket,
        key,
      );
    });
  }
}
