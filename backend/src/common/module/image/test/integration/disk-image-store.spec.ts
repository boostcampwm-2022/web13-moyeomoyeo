import { Test } from '@nestjs/testing';
import { ImageModule } from '@common/module/image/image.module';
import { UploadStrategy } from '@common/module/image/enums/upload-strategy.enum';
import { ImageStore } from '@common/module/image/image-store';

describe('DiskImageStore (int)', () => {
  let fileImageStore: ImageStore;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        ImageModule.register({
          strategy: UploadStrategy.DISK,
          options: {
            path: '.',
          },
        }),
      ],
    }).compile();

    fileImageStore = module.get(ImageStore);
  });

  test('파일이 잘 저장되는가', async () => {
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
    const path = await fileImageStore.upload(file);

    // then
    expect(path.endsWith('.jpg')).toBe(true);
  });
});
