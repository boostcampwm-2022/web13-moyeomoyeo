import { Injectable } from '@nestjs/common';
import { S3ConfigService } from '@src/common/config/s3/config.service';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import AWS from 'aws-sdk';
import { v4 } from 'uuid';
import { Request } from 'express';

@Injectable()
export class ImageService {
  private s3: S3Client;

  constructor(private s3ConfigService: S3ConfigService) {}

  async uploadImage(file: Express.Multer.File) {
    this.certificateS3();
    this.s3.send();
  }

  // loadStorage() {
  //   const s3Access = this.certificateS3();

  //   return multerS3({
  //     s3: s3Access,
  //     bucket: this.s3ConfigService.bucket,
  //     contentType: multerS3.AUTO_CONTENT_TYPE,
  //     acl: 'public-read',

  //     key(req: Request, file, callback) {
  //       const originFilename = file.originalname;
  //       const extension = originFilename.substring(
  //         originFilename.lastIndexOf('.'),
  //       );
  //       callback(
  //         null,
  //         `uploads/profile-images/${new Date().getTime()}-${v4()}${extension}`,
  //       );
  //     },
  //   });
  // }

  certificateS3() {
    this.s3 = new S3Client({
      credentials: {
        accessKeyId: this.s3ConfigService.accessKey,
        secretAccessKey: this.s3ConfigService.secretKey,
      },
      endpoint: this.s3ConfigService.endpoint,
      region: this.s3ConfigService.region,
    });
  }
}
