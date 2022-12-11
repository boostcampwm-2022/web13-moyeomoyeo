import { NoOffsetPageResult } from '@common/util/no-offset-page-result';

describe('No Offset Paging Result Test', () => {
  test.each([
    {
      limit: 5,
      nextId: 20,
      sortedData: [{ id: 20 }, { id: 19 }, { id: 18 }, { id: 17 }, { id: 16 }],
      beforeNextId: 20,
      resultNextId: 16,
      isLast: false,
    },
    {
      limit: 5,
      nextId: 30,
      sortedData: [{ id: 28 }, { id: 26 }, { id: 25 }, { id: 24 }, { id: 22 }],
      beforeNextId: 30,
      resultNextId: 22,
      isLast: false,
    },
    {
      limit: 3,
      nextId: undefined,
      sortedData: [{ id: 1000 }, { id: 500 }, { id: 200 }],
      beforeNextId: 1000,
      resultNextId: 200,
      isLast: false,
    },
    {
      limit: 3,
      nextId: undefined,
      sortedData: [{ id: 1000 }, { id: 500 }],
      beforeNextId: 1000,
      resultNextId: 500,
      isLast: true,
    },
    {
      limit: 3,
      nextId: undefined,
      sortedData: [],
      beforeNextId: undefined,
      resultNextId: undefined,
      isLast: true,
    },
    {
      limit: 3,
      nextId: 1000,
      sortedData: [],
      beforeNextId: 1000,
      resultNextId: 1000,
      isLast: true,
    },
  ])(
    'currentPage=$currentPage, countPerPage=$countPerPAge, totalCount=$totalCount 이면 totalPage=$totalPage',
    async ({
      limit,
      nextId,
      sortedData,
      beforeNextId,
      resultNextId,
      isLast,
    }) => {
      // given
      const Test = class extends NoOffsetPageResult<any> {
        get data() {
          return this._data;
        }
      };
      // when
      const result = new Test(limit, sortedData, nextId);

      // then
      expect(result.limit).toEqual(limit);
      expect(result.data).toEqual(sortedData);
      expect(result.beforeNextId).toEqual(beforeNextId);
      expect(result.nextId).toEqual(resultNextId);
      expect(result.isLast).toEqual(isLast);
    },
  );
});
