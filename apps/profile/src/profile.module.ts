import { ProfileEntity } from './profile.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresDBModule } from './../../../libs/shared/src/postgresdb.module';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { SharedModule } from '@app/shared';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),

    SharedModule,
    PostgresDBModule,

    TypeOrmModule.forFeature([ProfileEntity]),
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
