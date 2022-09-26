import { INestApplication, ValidationPipe } from '@nestjs/common';

export function middlewares(app: INestApplication): INestApplication {
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      enableDebugMessages: true,
    }),
  );
  return app;
}
