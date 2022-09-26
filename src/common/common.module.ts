import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UtilService } from './utils/util.service';
import { LoggerContextMiddleware } from './middlewares/logger-context.middleware';

@Global()
@Module({
  imports: [],
  providers: [UtilService],
  exports: [UtilService],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerContextMiddleware).forRoutes('*');
  }
}
