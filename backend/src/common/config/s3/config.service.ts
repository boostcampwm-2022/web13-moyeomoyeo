import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Config } from './validate';

@Injectable()
export class S3ConfigService {
  constructor(private readonly configService: ConfigService<S3Config, true>) {}

  get accessKey() {
    return this.configService.get('STORAGE_ACCESSKEY', { infer: true });
  }

  get secretKey() {
    return this.configService.get('STORAGE_SECRETKEY', { infer: true });
  }

  get region() {
    return this.configService.get('STORAGE_REGION', { infer: true });
  }

  get endpoint() {
    return this.configService.get('STORAGE_ENDPOINT', { infer: true });
  }

  get bucket() {
    return this.configService.get('STORAGE_BUCKET', { infer: true });
  }
}
