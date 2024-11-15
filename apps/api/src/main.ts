import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
 const app = await NestFactory.create(AppModule);

 app.enableCors();
 app.useGlobalPipes(new ValidationPipe());

 const config = new DocumentBuilder()
   .setTitle('Aqua Loyalty API')
   .setDescription('API dokumentacija za Aqua Loyalty sistem')
   .setVersion('1.0')
   .addBearerAuth()
   .build();

 const document = SwaggerModule.createDocument(app, config);
 SwaggerModule.setup('api', app, document);

 await app.listen(3000);
}
bootstrap();
