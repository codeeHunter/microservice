import { ProfileEntity } from './../../profile/src/profile.entity';
import { ExistingUserDto } from './dtos/existing-user.dto';
import {
  BadGatewayException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async getUsers() {
    return this.userRepository.find();
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
      select: ['id', 'firstName', 'password', 'phone', 'email'],
    });
  }

  async register(newUser: UserEntity) {
    const { firstName, lastName, email, password, phone } = newUser;

    const existingUser = await this.findByEmail(email);

    if (existingUser) {
      throw new ConflictException('Учетная запись с этой почтой существует.');
    }

    const hashedPassword = await this.hashPassword(password);

    const savedUser = await this.userRepository.save({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
    });

    try {
      await this.profileRepository.save({
        firstName,
        lastName,
        phone,
      });
    } catch (error) {
      throw new BadGatewayException(error);
    }

    delete savedUser.password;

    return { savedUser };
  }

  async doesPasswordMatch(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async validateUser(email: string, password: string): Promise<UserEntity> {
    const user = await this.findByEmail(email);

    const doesUserExist = !!user;

    if (!doesUserExist) return null;

    const doesPasswordMatch = await this.doesPasswordMatch(
      password,
      user.password,
    );

    if (!doesPasswordMatch) return null;
    return user;
  }

  async login(existingUser: ExistingUserDto) {
    const { email, password } = existingUser;
    const user = await this.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    const jwt = await this.jwtService.signAsync({ user });

    return { token: jwt };
  }

  async verifyJwt(jwt: string): Promise<{ exp: number }> {
    if (!jwt) {
      throw new UnauthorizedException();
    }

    try {
      const { exp } = await this.jwtService.verifyAsync(jwt);
      return { exp };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
