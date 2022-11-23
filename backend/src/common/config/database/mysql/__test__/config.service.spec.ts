import { Test } from '@nestjs/testing';
import { MysqlConfigModule } from '@config/database/mysql/config.module';
import { MysqlConfigService } from '@config/database/mysql/config.service';

describe('MysqlConfigService Test', () => {
  let mysqlConfigService: MysqlConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [MysqlConfigModule],
    }).compile();

    mysqlConfigService = module.get(MysqlConfigService);
  });

  test('MYSQL_PORT를 잘가져오는가', async () => {
    // given
    const port = process.env.MYSQL_PORT;
    // when

    // then
    expect(mysqlConfigService.port).toEqual(parseInt(port, 10));
  });

  test('MYSQL_HOST를 잘가져오는가', async () => {
    // given
    const hostname = process.env.MYSQL_HOST;

    // when
    // then
    expect(mysqlConfigService.hostname).toEqual(hostname);
  });

  test('MYSQL_USER를 잘가져오는가', async () => {
    // given
    const username = process.env.MYSQL_USER;

    // when
    // then
    expect(mysqlConfigService.username).toEqual(username);
  });
  test('MYSQL_PASSWORD를 잘가져오는가', async () => {
    // given
    const password = process.env.MYSQL_PASSWORD;

    // when
    // then
    expect(mysqlConfigService.password).toEqual(password);
  });
  test('MYSQL_DATABASE를 잘가져오는가', async () => {
    // given
    const database = process.env.MYSQL_DATABASE;

    // when
    // then
    expect(mysqlConfigService.database).toEqual(database);
  });
});
