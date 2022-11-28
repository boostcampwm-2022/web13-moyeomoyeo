import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export abstract class PageResult<T> {
  @Exclude() protected readonly _totalCount: number;
  @Exclude() protected readonly _currentPage: number;
  @Exclude() protected readonly _countPerPage: number;
  @Exclude() protected readonly _data: T[];

  constructor(
    totalCount: number,
    currentPage: number,
    countPerPage: number,
    data: T[],
  ) {
    this._totalCount = totalCount;
    this._currentPage = currentPage;
    this._countPerPage = countPerPage;
    this._data = data;
  }

  @Expose()
  @ApiProperty({ example: 100, description: '전체 페이지수' })
  get totalPage() {
    return Math.ceil(this._totalCount / this._countPerPage);
  }

  @Expose()
  @ApiProperty({ example: 1, description: '현재 페이지' })
  get currentPage() {
    return this._currentPage;
  }

  @Expose()
  @ApiProperty({ example: 20, description: '페이지 당 개수' })
  get countPerPage() {
    return this._countPerPage;
  }

  abstract get data(): T[];
}
