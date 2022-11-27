import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { s3Config } from './configuration';

@Injectable()
export class S3ConfigService {
  constructor(
    @Inject(s3Config.KEY)
    private readonly s3Configuration: ConfigType<typeof s3Config>,
  ) {}

  get accessKey() {
    return this.s3Configuration.STORAGE_ACCESSKEY;
  }

  get secretKey() {
    return this.s3Configuration.STORAGE_SECRETKEY;
  }

  get region() {
    return this.s3Configuration.STORAGE_REGION;
  }

  get endpoint() {
    return this.s3Configuration.STORAGE_ENDPOINT;
  }

  get bucket() {
    return this.s3Configuration.STORAGE_BUCKET;
  }

  get path() {
    return this.s3Configuration.STORAGE_BUCKET_PATH;
  }
}
