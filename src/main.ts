import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('BAMG API')
    .setDescription('Bamp API to interact with players and teams')
    .setVersion('1.0')
    .addTag('bamg')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  fs.writeFileSync('./swagger-spec.json', JSON.stringify(document));

  SwaggerModule.setup('/api', app, document);

  await app.listen(3000);
}
bootstrap();
