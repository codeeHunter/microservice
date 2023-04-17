import { ProfileEntity } from './../../profile/src/profile.entity';
import { JwtModule } from '@nestjs/jwt';
import { SharedModule } from './../../../libs/shared/src/shared.module';
import { PostgresDBModule } from './../../../libs/shared/src/postgresdb.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserEntity } from './user.entity';
import { JwtStrategy } from 'apps/api/src/jwt-strategy';
import { JwtGuard } from 'apps/api/src/jwt.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '360s' },
      }),
      inject: [ConfigService],
    }),

    SharedModule,
    PostgresDBModule,
    TypeOrmModule.forFeature([UserEntity, ProfileEntity]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtGuard, JwtStrategy],
})
export class AuthModule {}
