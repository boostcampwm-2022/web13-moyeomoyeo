import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export abstract class NoOffsetPageResult<T extends { id: number }> {
  @Exclude() protected readonly _data: T[];
  @Exclude() protected readonly _limit: number;
  @Exclude() protected readonly _beforeNextId: number;

  constructor(limit: number, sortedData: T[], nextId?: number) {
    this._limit = limit;
    this._beforeNextId = nextId;
    this._data = sortedData;
  }

  @Expose()
  @ApiProperty({ example: 10, description: '요청한 데이터 수' })
  get limit() {
    return this._limit;
  }

  @Expose()
  @ApiProperty({ example: 20, description: '요청한 nextId' })
  get beforeNextId() {
    return this._beforeNextId === undefined
      ? this._data[0]?.id
      : this._beforeNextId;
  }

  @Expose()
  @ApiProperty({ example: 10, description: '디음에 호출시 넣어야하는 nextId' })
  get nextId() {
    return this._data[this._data.length - 1]?.id || this._beforeNextId;
  }

  @Expose()
  @ApiProperty({
    example: false,
    description: '마지막 데이터인지 여부',
  })
  get isLast() {
    return this._data.length < this._limit;
  }

  abstract get data(): T[];
}
