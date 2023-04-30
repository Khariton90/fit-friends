import { Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ExtendedUserRequest } from '@fit-friends/shared-types';
import { CheckMongoidValidationPipe } from '@fit-friends/core';

@ApiTags('Friends')
@Controller('friends')
export class FriendsController {
  constructor(
    private readonly friendsService: FriendsService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('/:friendId')
  @ApiOperation({summary: 'Add or remove the user as a friend by ID'})
  async addAndRemove(
    @Param('friendId', CheckMongoidValidationPipe) friendId: string, 
    @Req() {user}: ExtendedUserRequest) {
    const updatedFriends = await this.friendsService.addAndRemove(user.sub, friendId);
    return updatedFriends;
  }
}
