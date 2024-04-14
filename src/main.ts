import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Test APIs')
    .setDescription('Test APIs')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const options: SwaggerCustomOptions = {
    swaggerOptions: {
      displayOperationId: true,
      displayRequestDuration: true,
    },
  };
  SwaggerModule.setup('api/docs', app, document, options);

  await app.listen(3000);
}
bootstrap();
