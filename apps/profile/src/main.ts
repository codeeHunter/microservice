import { SharedService } from './../../../libs/shared/src/shared.service';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ProfileModule } from './profile.module';

async function bootstrap() {
  const app = await NestFactory.create(ProfileModule);
  const configService = app.get(ConfigService);
  const sharedService = app.get(SharedService);
  const queue = configService.get('RABBITMQ_PROFILE_QUEUE');

  app.connectMicroservice(sharedService.getRmqOptions(queue));

  app.startAllMicroservices();
}
bootstrap();
