import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { WorkoutRepository } from './workout.repository';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { WorkoutEntity } from './workout.entity';

@Injectable()
export class AppService {
  constructor(
    private readonly workoutRepository: WorkoutRepository,
  ) {}

  async createWorkout(dto: CreateWorkoutDto) {
    const workoutEntity = new WorkoutEntity(dto);
    const newWorkout = await this.workoutRepository.create(workoutEntity);
    return newWorkout;
  }

  async updateWorkout(id: string, dto: UpdateWorkoutDto, userId: string) {
    const existWorkout = await this.workoutRepository.findById(id);

    if (!existWorkout) {
      throw new NotFoundException('This workout not found');
    }

    if (existWorkout.coach !== userId) {
      throw new BadRequestException('You can only change your own workouts');
    }

    const updateWorkout = await this.workoutRepository.update(id, dto);
    return updateWorkout;
  }
}
