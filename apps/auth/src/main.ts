import { SharedService } from './../../../libs/shared/src/shared.service';
import { ConfigService } from '@nestjs/config/dist';
import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const configService = app.get(ConfigService);
  const sharedService = app.get(SharedService);
  const queue = configService.get('RABBITMQ_AUTH_QUEUE');

  app.connectMicroservice(sharedService.getRmqOptions(queue));

  app.startAllMicroservices();
}
bootstrap();
