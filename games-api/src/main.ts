import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); //! Allows ressources from other ports to be loaded; for frontend
  //Swagger
  const config = new DocumentBuilder()
    .setTitle('Video Games API')
    .setDescription('API for managing video game sales data')
    .setVersion('1.0') // just a display: needs to be changed with each version
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config); //Allows Swagger to read NestJS's structure
  SwaggerModule.setup('api', app, document);
  //
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();


