import { applyDecorators, HttpException } from '@nestjs/common';
import {
  ApiResponse,
  ApiResponseOptions,
  getSchemaPath,
} from '@nestjs/swagger';
import { instanceToPlain } from 'class-transformer';
import { ResponseEntity } from '../response-entity';

export function ApiErrorResponse(...errors: { new (): HttpException }[]) {
  const apiResponses = {};

  errors.forEach((error) => {
    const errorInstance = new error();
    const status = errorInstance.getStatus();
    const {
      status: errorCode,
      message,
      ...data
    } = errorInstance.getResponse() as {
      status: string;
      message: string;
      [key: string]: any;
    };
    if (!apiResponses[status]) {
      apiResponses[status] = {
        status,
        content: {
          'application/json': {
            schema: { $ref: getSchemaPath(ResponseEntity) },
            examples: {
              [errorCode]: {
                description: message,
                value: instanceToPlain(
                  ResponseEntity.ERROR_WITH_DATA(message, errorCode, data),
                ),
              },
            },
          },
        },
      };
    } else {
      apiResponses[status].content['application/json'].examples[errorCode] = {
        description: message,
        value: instanceToPlain(
          ResponseEntity.ERROR_WITH_DATA(message, errorCode, data),
        ),
      };
    }
  });

  return applyDecorators(
    ...Object.values(apiResponses).map((value: ApiResponseOptions) => {
      return ApiResponse({ ...value });
    }),
  );
}
