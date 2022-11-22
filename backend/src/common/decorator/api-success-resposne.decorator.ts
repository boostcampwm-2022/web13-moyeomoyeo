import { applyDecorators, HttpCode, HttpStatus, Type } from '@nestjs/common';
import { ApiProperty, ApiResponse } from '@nestjs/swagger';
import { ResponseEntity } from '../response-entity';

export function ApiSuccessResponse(
  status: HttpStatus,
  dataType: Type<any> = String,
  { isArray } = { isArray: false },
) {
  class Temp extends ResponseEntity<any> {
    @ApiProperty({
      type: dataType,
      example: dataType === String ? '' : () => dataType,
      isArray,
    })
    get data() {
      return super.data;
    }
  }

  Object.defineProperty(Temp, 'name', {
    value: `ResponseEntity<${dataType.name}${isArray ? 'Array' : ''}>`,
  });

  return applyDecorators(
    HttpCode(status),
    ApiResponse({
      type: dataType && Temp,
      status,
      description: HttpStatus[status],
    }),
  );
}
