import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { WorkoutRdo } from './rdo/workout.rdo';
import { CheckMongoidValidationPipe, fillObject } from '@fit-friends/core';
import { ExtendedUserRequest } from '@fit-friends/shared-types';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { Controller, Body, UseGuards, Post, Req, Put, Param, Get } from '@nestjs/common';
import { AppService } from './app.service';

@ApiTags('Workout')
@Controller('workout')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(JwtAuthGuard)
  @Post('new')
  async createWorkout(@Body() dto: CreateWorkoutDto, @Req() { user }: ExtendedUserRequest) {
    const newWorkout = await this.appService.createWorkout(user, {...dto, coach: user.sub});
    return fillObject(WorkoutRdo, newWorkout);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/all/:coachId')
  async findAllWorkout(@Param('coachId', CheckMongoidValidationPipe) coachId: string, @Req() { user }: ExtendedUserRequest) {
    const workoutList = await this.appService.find(coachId, user);
    return fillObject(WorkoutRdo, workoutList);
  }

  @Get(':workoutId')
  async findById(@Param('workoutId', CheckMongoidValidationPipe) workoutId: string) {
    const workout = await this.appService.findById(workoutId);
    return fillObject(WorkoutRdo, workout);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateWorkout(
    @Param('id', CheckMongoidValidationPipe) id: string, 
    @Body() dto: UpdateWorkoutDto, 
    @Req() {user}: ExtendedUserRequest
  ) {
    const updateWorkout = await this.appService.updateWorkout(id, dto, user);
    return fillObject(WorkoutRdo, updateWorkout);
  }
}
