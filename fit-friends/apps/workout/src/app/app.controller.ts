import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { WorkoutRdo } from './rdo/workout.rdo';
import { CheckMongoidValidationPipe, fillObject } from '@fit-friends/core';
import { ExtendedUserRequest } from '@fit-friends/shared-types';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { Controller, Body, UseGuards, Post, Req, Put, Param, Get, Res, HttpStatus, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { WorkoutQuery } from './query/workout.query';

@ApiTags('Workout')
@Controller('workout')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(JwtAuthGuard)
  @Post('new')
  @ApiResponse({
    type: WorkoutRdo,
    status: HttpStatus.OK,
    description: "A new training has been created"
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "The user is not authorized"
  })
  async createWorkout(@Body() dto: CreateWorkoutDto, @Req() { user }: ExtendedUserRequest) {
    const newWorkout = await this.appService.createWorkout(user, {...dto, coach: user.sub});
    return fillObject(WorkoutRdo, newWorkout);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/all/:coachId')
  @ApiResponse({
    type: [WorkoutRdo],
    status: HttpStatus.OK,
    description: "A list of training has been received"
  })
  async findAllWorkout(
    @Param('coachId', CheckMongoidValidationPipe) coachId: string, 
    @Req() { user }: ExtendedUserRequest,
    @Query() query: WorkoutQuery
    ) {
    const workoutList = await this.appService.find(coachId, user, query);
    return fillObject(WorkoutRdo, workoutList);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':workoutId')
  @ApiResponse({
    type: WorkoutRdo,
    status: HttpStatus.OK,
    description: "User training is received by ID"
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "The user is not authorized"
  })
  async findById(@Param('workoutId', CheckMongoidValidationPipe) workoutId: string) {
    const workout = await this.appService.findById(workoutId);
    return fillObject(WorkoutRdo, workout);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiResponse({
    type: WorkoutRdo,
    status: HttpStatus.OK,
    description: "Updated the data of the user"
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "The user is not authorized"
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "The server expected other data"
  })
  async updateWorkout(
    @Param('id', CheckMongoidValidationPipe) id: string, 
    @Body() dto: UpdateWorkoutDto, 
    @Req() {user}: ExtendedUserRequest
  ) {
    const updateWorkout = await this.appService.updateWorkout(id, dto, user);
    return fillObject(WorkoutRdo, updateWorkout);
  }

  @UseGuards(JwtAuthGuard)
  @Get('image/:filename')
  @ApiResponse({
    type: String,
    status: HttpStatus.OK,
    description: "The image was received",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "The user is not authorized"
  })
  async getPhoto(@Param('filename') filename: string, @Res() res) {
    res.sendFile(filename, { root: './uploads' });
  }
}
