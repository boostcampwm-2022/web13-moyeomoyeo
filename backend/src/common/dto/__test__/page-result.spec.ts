import { PageResult } from '@common/dto/page-result';

describe('Paging Result Test', () => {
  test.each([
    { currentPage: 1, countPerPage: 20, totalCount: 40, totalPage: 2 },
    { currentPage: 1, countPerPage: 7, totalCount: 40, totalPage: 6 },
    { currentPage: 1, countPerPage: 50, totalCount: 40, totalPage: 1 },
    { currentPage: 1, countPerPage: 12, totalCount: 40, totalPage: 4 },
  ])(
    'currentPage=$currentPage, countPerPage=$countPerPAge, totalCount=$totalCount 이면 totalPage=$totalPage',
    async ({ countPerPage, currentPage, totalCount, totalPage }) => {
      // given
      const Test = class extends PageResult<any> {
        get data() {
          return this._data;
        }
      };
      // when
      const result = new Test(totalCount, currentPage, countPerPage, []);

      // then
      expect(result.totalPage).toEqual(totalPage);
      expect(result.currentPage).toEqual(currentPage);
      expect(result.countPerPage).toEqual(countPerPage);
    },
  );
});
