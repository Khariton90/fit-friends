import { FoodJournalDto } from './dto/food-journal.dto';
import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { FoodJournalService } from './food-journal.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ExtendedUserRequest } from '@fit-friends/shared-types';
import { ApiTags } from '@nestjs/swagger';
import { CheckMongoidValidationPipe, fillObject } from '@fit-friends/core';
import { FoodJournalRdo } from './rdo/food-journal.rdo';

@ApiTags('Food-Journal')
@Controller('food-journal')
export class FoodJournalController {
  constructor(
    private readonly foodJournalService: FoodJournalService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('/add')
  public async addDay(@Body() dto: FoodJournalDto, @Req() {user}: ExtendedUserRequest) {
    const newDay = await this.foodJournalService.create(user.sub, dto);
    return fillObject(FoodJournalRdo, newDay);
  } 

  @UseGuards(JwtAuthGuard)
  @Get('/')
  public async findFoodJournal(@Req() {user}: ExtendedUserRequest) {
    const foodJournal = await this.foodJournalService.find(user.sub);
    return fillObject(FoodJournalRdo, foodJournal);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  public async updateFoodJournal(@Param('id', CheckMongoidValidationPipe) id: string, @Body() dto: FoodJournalDto, @Req() {user}: ExtendedUserRequest) {
    const foodJournal = await this.foodJournalService.update(id, dto, user.sub);
    return fillObject(FoodJournalRdo, foodJournal);
  }
}
