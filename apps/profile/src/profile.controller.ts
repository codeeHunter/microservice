import { ProfileEntity } from './profile.entity';
import { SharedService } from './../../../libs/shared/src/shared.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { ProfileService } from './profile.service';

@Controller()
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
    private readonly sharedService: SharedService,
  ) {}

  @MessagePattern({ cmd: 'profiles' })
  async getUsersProfiles(@Ctx() context: RmqContext) {
    this.sharedService.acknowledgeMessage(context);

    return await this.profileService.getUsersProfiles();
  }
}
