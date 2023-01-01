import { Controller, Sse } from '@nestjs/common';
import { SseService } from '@common/module/sse/sse.service';
import { JwtAuth } from '@decorator/jwt-auth.decorator';
import { CurrentUser } from '@decorator/current-user.decorator';
import { User } from '@app/user/entity/user.entity';

@Controller('sse')
export class SseController {
  constructor(private readonly sseService: SseService) {}

  @Sse()
  @JwtAuth()
  sse(@CurrentUser() user: User) {
    return this.sseService.subscribe(user);
  }
}
