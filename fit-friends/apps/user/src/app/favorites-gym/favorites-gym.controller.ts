import { Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FavoritesGymService } from './favorites-gym.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CheckMongoidValidationPipe, fillObject } from '@fit-friends/core';
import { FavoritesGymRdo } from './rdo/favorites-gym.rdo';
import { ExtendedUserRequest } from '@fit-friends/shared-types';

@ApiTags('Favorites-gym')
@Controller('favorites-gym')
export class FavoritesGymController {
  constructor(
    private readonly favoritesGymService: FavoritesGymService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('/:gymId')
  @ApiOperation({summary: 'Add or remove the gym to favorites'})
  async toggleFavoriteGym(
    @Param('gymId', CheckMongoidValidationPipe) gymId: string, 
    @Req() {user}: ExtendedUserRequest) {
    const gymList = await this.favoritesGymService.update({gym: gymId, user: user.sub});
    return fillObject(FavoritesGymRdo, gymList);
  }
}
