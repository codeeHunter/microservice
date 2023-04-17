import { JwtStrategy } from './jwt-strategy';
import { JwtGuard } from './jwt.guard';
import { SharedModule } from './../../../libs/shared/src/shared.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
    SharedModule.registerRmq('AUTH_SERVICE', process.env.RABBITMQ_AUTH_QUEUE),
    SharedModule.registerRmq(
      'PROFILE_SERVICE',
      process.env.RABBITMQ_PROFILE_QUEUE,
    ),
  ],
  controllers: [AppController],
  providers: [AppService, JwtGuard, JwtStrategy],
})
export class AppModule {}
