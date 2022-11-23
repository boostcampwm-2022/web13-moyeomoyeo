import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseEntity<T> {
  @Exclude() private readonly _status: string;
  @Exclude() private readonly _message: string;
  @Exclude() private readonly _data: T;

  protected constructor(status: string, message: string, data: T) {
    this._status = status;
    this._message = message;
    this._data = data;
  }

  static OK() {
    return new ResponseEntity<string>('OK', '', '');
  }

  static OK_WITH_DATA<T>(data: T) {
    return new ResponseEntity<T>('OK', '', data);
  }

  static ERROR() {
    return new ResponseEntity<string>(
      'INTERNAL_SERVER_ERROR',
      '알 수 없는 에러가 발생했습니다',
      '',
    );
  }

  static ERROR_WITH(message: string, status = 'INTERNAL_SERVER_ERROR') {
    return new ResponseEntity(status, message, '');
  }

  static ERROR_WITH_DATA<T>(
    message: string,
    status = 'INTERNAL_SERVER_ERROR',
    data: T,
  ) {
    return new ResponseEntity<T>(status, message, data);
  }

  @Expose()
  @ApiProperty({ example: 'OK' })
  get status() {
    return this._status;
  }

  @Expose()
  @ApiProperty({ example: '' })
  get message() {
    return this._message;
  }

  @Expose()
  @ApiProperty()
  get data(): T {
    return this._data;
  }
}
