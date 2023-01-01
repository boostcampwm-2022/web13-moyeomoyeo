import { Module } from '@nestjs/common';
import { SseService } from '@common/module/sse/sse.service';

@Module({
  providers: [SseService],
  exports: [SseService],
})
export class SseModule {}
