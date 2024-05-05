import { NestFactory } from '@nestjs/core';

import { AppModule } from '@/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(4000);
}

bootstrap().catch((error: unknown) => {
  // eslint-disable-next-line no-console
  console.error(error);
});
