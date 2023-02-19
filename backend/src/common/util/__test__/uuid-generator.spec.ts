import { UuidGenerator } from '@common/util/uuid-generator';

describe('UuidGenerator Unit Test', () => {
  test('길이가 없으면 전체 uuid를 반환합니다', async () => {
    // given
    // when
    const result = UuidGenerator.generate();

    // then
    expect(result.length).toBe(36);
  });

  test.each([10, 15, 20, 5, 30])(
    '길이를 %d로 전달하면 정해진 길이만큼 잘라서 반환합니다',
    async (length) => {
      // given
      // when
      const result = UuidGenerator.generate(length);

      // then
      expect(result.length).toBe(length);
    },
  );
});
