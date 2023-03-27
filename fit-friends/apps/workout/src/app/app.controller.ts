import { CheckMongoidValidationPipe } from './../../../comment/src/pipes/check-mongo-id-validation-pipe';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { WorkoutRdo } from './rdo/workout.rdo';
import { fillObject } from '@fit-friends/core';
import { ExtendedUserRequest, UserRole } from '@fit-friends/shared-types';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { Controller, Body, UseGuards, Post, Req, BadRequestException, Put, Param } from '@nestjs/common';
import { AppService } from './app.service';

@ApiTags('Workout')
@Controller('workout')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(JwtAuthGuard)
  @Post('new')
  async createWorkout(@Body() dto: CreateWorkoutDto, @Req() {user}: ExtendedUserRequest) {
    if (!user) {
      throw new BadRequestException('Create workout must be authtorized users')
    }

    if (user.role !== UserRole.Coach) {
      throw new BadRequestException('Create workout must be authtorized coachs')
    }

    const newWorkout = await this.appService.createWorkout({...dto, coach: user.sub});
    return fillObject(WorkoutRdo, newWorkout);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateWorkout(
    @Param('id', CheckMongoidValidationPipe) id: string, 
    @Body() dto: UpdateWorkoutDto, 
    @Req() {user}: ExtendedUserRequest
  ) {
    if (user.role !== UserRole.Coach) {
      throw new BadRequestException('Update workout must be coach')
    }

    const updateWorkout = await this.appService.updateWorkout(id, dto, user.sub);
    return fillObject(WorkoutRdo, updateWorkout);
  }
}
