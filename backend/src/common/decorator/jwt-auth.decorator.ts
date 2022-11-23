import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@common/guard/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ApiErrorResponse } from '@decorator/api-error-response.decorator';
import { InvalidTokenException } from '@exception/invalid-token.exception';

export function JwtAuth() {
  return applyDecorators(
    UseGuards(JwtAuthGuard),
    ApiBearerAuth(),
    ApiErrorResponse(InvalidTokenException),
  );
}
