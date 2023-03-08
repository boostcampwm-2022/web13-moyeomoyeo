import { Test } from '@nestjs/testing';
import { ImageModule } from '@common/module/image/image.module';
import { UploadStrategy } from '@common/module/image/enums/upload-strategy.enum';
import { ImageStore } from '@common/module/image/image-store';
import { S3ImageStore } from '@common/module/image/s3-image-store';

describe('S3ImageModule (int)', () => {
  let s3ImageStore: S3ImageStore;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        ImageModule.register({
          strategy: UploadStrategy.S3,
          options: {
            region: 'test',
            credentials: {
              accessKeyId: 'accessKey',
              secretAccessKey: 'secretKey',
            },
            bucket: 'test-bucket',
            acl: 'public-read',
            path: '/path',
            endPoint: 'http://localhost:4567',
            forcePathStyle: true,
          },
        }),
      ],
    }).compile();

    s3ImageStore = module.get(ImageStore);
  });

  it('', async () => {
    // given
    const file: Express.Multer.File = {
      fieldname: 'file',
      originalname: 'test.jpg',
      encoding: '',
      mimetype: 'image/jpeg',
      size: 100,
      destination: '',
      filename: '',
      path: '',
      buffer: Buffer.from('image-test'),
      stream: '' as any,
    };

    // when
    const path = await s3ImageStore.upload(file);

    // then
    expect(path.endsWith('.jpg')).toBe(true);
    expect(path.startsWith('/path')).toBe(true);
  });
});
