import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { RolesGuard } from './auth/guard/roles.guard';
import { ResponseInterceptor } from './interceptors/response-interceptor.interceptor';
import * as process from 'node:process';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CustomLogger } from './custom-logger';

async function bootstrap() {
  const port = process.env.APP_PORT || 3000;

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }));
  app.useGlobalGuards(
    new JwtAuthGuard(app.get(Reflector)),
    new RolesGuard(app.get(Reflector)),
  );
  app.useGlobalInterceptors(new ResponseInterceptor());
  const config = new DocumentBuilder()
    .setTitle('Employee Digital')
    .setDescription(
      'This Apis provide full access to the employee and company management operations',
    )
    .setVersion('1.0')
    .addBearerAuth( {
        description: 'Default JWT Authorization',
        type: 'http',
        in: 'header',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },)
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    deepScanRoutes: true,
  });
  SwaggerModule.setup('document', app, document, {
    jsonDocumentUrl: 'document/json',
  });

  app.useLogger(app.get(CustomLogger));
  await app.listen(port);
  app.get(CustomLogger).log(`The Application Is Running On Port ${port}`);
}

bootstrap();
