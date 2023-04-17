import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices/client/client-proxy';

@Controller()
export class AppController {
  constructor(
    @Inject('AUTH_SERVICE') private authService: ClientProxy,
    @Inject('PROFILE_SERVICE') private profileService: ClientProxy,
  ) {}

  @Get('profiles')
  async getUsersProfiles() {
    return this.profileService.send(
      {
        cmd: 'profiles',
      },
      {},
    );
  }

  @Get('auth')
  async getUsers() {
    return this.authService.send(
      {
        cmd: 'get-users',
      },
      {},
    );
  }

  @Post('auth')
  async postUser() {
    return this.authService.send(
      {
        cmd: 'post-user',
      },
      {},
    );
  }

  @Post('auth/register')
  async register(
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('phone') phone: string,
  ) {
    return this.authService.send(
      {
        cmd: 'register',
      },
      {
        firstName,
        lastName,
        email,
        password,
        phone,
      },
    );
  }

  @Post('auth/register')
  async registerProfile(
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('phone') phone: string,
  ) {
    return this.profileService.send(
      {
        cmd: 'register-profile',
      },
      {
        firstName,
        lastName,
        phone,
      },
    );
  }

  @Post('auth/login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authService.send(
      {
        cmd: 'login',
      },
      {
        email,
        password,
      },
    );
  }
}
