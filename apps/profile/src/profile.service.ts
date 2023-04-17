import { InjectRepository } from '@nestjs/typeorm';
import { ProfileEntity } from './profile.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
  ) {}

  async getUsersProfiles() {
    return await this.profileRepository.find();
  }
}
