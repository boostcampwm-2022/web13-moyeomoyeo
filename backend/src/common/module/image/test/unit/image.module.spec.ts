import { ImageModule } from '@common/module/image/image.module';

describe('ImageModule', () => {
  describe('register', () => {
    it('', async () => {
      // given
      const options = {
        test: 'test',
      };

      // when
      const module = ImageModule.register(options as any);

      // then
      expect(module.imports).toBeUndefined();
    });
  });
});
