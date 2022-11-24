import { Injectable, Logger } from '@nestjs/common';
import { S3ConfigService } from '@src/common/config/s3/config.service';
import { Endpoint, S3 } from 'aws-sdk';
import * as path from 'path';
import { v4 } from 'uuid';

@Injectable()
export class ImageService {
  private readonly logger = new Logger(ImageService.name);

  constructor(private s3ConfigService: S3ConfigService) {}

  uploadImage(files: Array<Express.Multer.File>) {
    const s3 = this.certificateS3();
    const keyList = this.pushImageAndGetKey(s3, files);
    const urlList = this.getStorageUrl(s3, keyList);
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

  pushImageAndGetKey(s3: S3, files: Express.Multer.File[]) {
    const keyList = [];

    files.forEach((file) => {
      const extension = this.findImageExtension(file.originalname);
      if (extension.length === 0) return;

      const key = path.join(
        this.s3ConfigService.path,
        `${new Date().getTime()}-${v4()}${extension}`,
      );

      const upload = this.uploadImageToS3(s3, file, key);
      this.logger.log(upload);
      keyList.push(key);
    });

    return keyList;
  }

  findImageExtension(fileName: string) {
    const regex = /(\.gif|\.jpg|\.jpeg|\.png)$/gi;
    const result = fileName.match(regex);
    return result === null ? '' : result[0];
  }

  uploadImageToS3(s3: S3, file: Express.Multer.File, key: string) {
    return s3.upload(
      {
        Bucket: this.s3ConfigService.bucket,
        Key: key,
        Body: file.buffer,
        ACL: 'public-read',
      },

      (err, data) => {
        this.logger.error(err);
      },
    );
  }

  getStorageUrl(s3: S3, keyList: string[]) {
    return keyList.map((key) => {
      return path.join(
        this.s3ConfigService.endpoint,
        this.s3ConfigService.bucket,
        key,
      );
    });
  }
}
