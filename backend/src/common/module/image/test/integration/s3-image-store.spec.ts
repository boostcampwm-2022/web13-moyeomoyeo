import { Test } from '@nestjs/testing';
import { ImageModule } from '@common/module/image/image.module';
import { UploadStrategy } from '@common/module/image/enums/upload-strategy.enum';
import { ImageStore } from '@common/module/image/image-store';
import { S3ImageStore } from '@common/module/image/s3-image-store';
import { S3ConfigModule } from '@config/s3/config.module';
import { S3ConfigService } from '@config/s3/config.service';
import { ImageUploadConfiguration } from '@common/module/image/type/image-upload-configuration.interface';

describe('S3ImageStore (int)', () => {
  let s3ImageStore: S3ImageStore;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        ImageModule.registerAsync({
          imports: [S3ConfigModule],
          useFactory: (
            s3ConfigService: S3ConfigService,
          ): ImageUploadConfiguration => {
            return {
              strategy: UploadStrategy.S3,
              options: {
                region: s3ConfigService.region,
                credentials: {
                  accessKeyId: s3ConfigService.accessKey,
                  secretAccessKey: s3ConfigService.secretKey,
                },
                bucket: s3ConfigService.bucket,
                acl: 'public-read',
                path: s3ConfigService.path,
              },
            };
          },
          inject: [S3ConfigService],
        }),
      ],
    }).compile();

    s3ImageStore = module.get(ImageStore);
  });

  it('', async () => {
    // given
    console.log(s3ImageStore);
    // when
    // then
  });
});
