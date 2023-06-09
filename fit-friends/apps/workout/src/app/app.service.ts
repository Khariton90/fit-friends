import { UserRequest, UserRole } from '@fit-friends/shared-types';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { WorkoutRepository } from './workout.repository';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { WorkoutEntity } from './workout.entity';
import { LOCAL_IMAGE } from './app.constant';
import { WorkoutQuery } from './query/workout.query';

@Injectable()
export class AppService {
  constructor(
    private readonly workoutRepository: WorkoutRepository,
  ) {}

  async createWorkout(user: UserRequest, dto: CreateWorkoutDto) {
    if (!user) {
      throw new BadRequestException('Create workout must be authtorized users')
    }

    if (user.role !== UserRole.Coach) {
      throw new BadRequestException('Create workout must be authtorized coachs')
    }

    const workoutEntity = new WorkoutEntity({...dto, image: LOCAL_IMAGE});
    const newWorkout = await this.workoutRepository.create(workoutEntity);
    return newWorkout;
  }

  async find(coachId: string, user: UserRequest, query: WorkoutQuery) {
    if (coachId !== user.sub) {
      throw new BadRequestException('It is possible to request only your own training')
    }

    return await this.workoutRepository.find(coachId, query);
  }

  async findById(workoutId: string) {
    const existWorkout = await this.workoutRepository.findById(workoutId);

    if (!existWorkout) {
      throw new NotFoundException(`Training with ID: ${workoutId} not found`)
    }

    return existWorkout;
  }

  async updateWorkout(id: string, dto: UpdateWorkoutDto, user: UserRequest) {
    const existWorkout = await this.workoutRepository.findById(id);

    if (user.role !== UserRole.Coach) {
      throw new BadRequestException('Update workout must be coach')
    }

    if (!existWorkout) {
      throw new NotFoundException('This workout not found');
    }

    const updateWorkout = await this.workoutRepository.update(id, dto);
    return updateWorkout;
  }
}
