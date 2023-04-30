import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PersonalAccountService } from './personal-account.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ExtendedUserRequest } from '@fit-friends/shared-types';
import { fillObject } from '@fit-friends/core';
import { FavoritesGymRdo } from '../favorites-gym/rdo/favorites-gym.rdo';
import { FriendsRdo } from '../friends/rdo/friends.rdo';

@ApiTags('Personal-account')
@Controller('personal-account')
export class PersonalAccountController {
  constructor(
    private readonly personalAccountService: PersonalAccountService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('gyms')
  @ApiOperation({summary: 'Get a list of sports gyms added to favorites'})
  public async findMyGymList(@Req() req: ExtendedUserRequest) {
    const gymList = await this.personalAccountService.findFavoritesGymList(req.user.sub);
    return fillObject(FavoritesGymRdo, gymList);
  }

  @UseGuards(JwtAuthGuard)
  @Get('friends')
  @ApiOperation({summary: 'Get a full list of friends'})
  public async findFriendsList(@Req() req: ExtendedUserRequest) {
    const friendsList = await this.personalAccountService.findFriendsList(req.user.sub);
    return fillObject(FriendsRdo, friendsList);
  }
}
