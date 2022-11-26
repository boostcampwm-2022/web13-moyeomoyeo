import { S3ConfigService } from '../config.service';
import { Test } from '@nestjs/testing';
import { S3ConfigModule } from '../config.module';

describe('App Config Service Test', () => {
  let s3ConfigService: S3ConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [S3ConfigModule],
    }).compile();

    s3ConfigService = module.get(S3ConfigService);
  });

  test('Storage Access Key를 잘 가져오는가', async () => {
    // given

    // when

    // then
    expect(s3ConfigService.accessKey).toEqual(process.env.STORAGE_ACCESSKEY);
  });

  test('Storage Secret Key를 잘 가져오는가', async () => {
    // given

    // when

    // then
    expect(s3ConfigService.secretKey).toEqual(process.env.STORAGE_SECRETKEY);
  });

  test('Storage Region를 잘 가져오는가', async () => {
    // given

    // when

    // then
    expect(s3ConfigService.region).toEqual(process.env.STORAGE_REGION);
  });

  test('Storage Endpoint를 잘 가져오는가', async () => {
    // given

    // when

    // then
    expect(s3ConfigService.endpoint).toEqual(process.env.STORAGE_ENDPOINT);
  });

  test('Storage Bucket를 잘 가져오는가', async () => {
    // given

    // when

    // then
    expect(s3ConfigService.bucket).toEqual(process.env.STORAGE_BUCKET);
  });
});
