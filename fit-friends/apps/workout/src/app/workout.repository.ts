import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { WorkoutModel } from './workout.model';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { WorkoutEntity } from './workout.entity';
import { CRUDRepository } from "@fit-friends/core";
import { Workout } from '@fit-friends/shared-types';
import { Model } from 'mongoose';

@Injectable()
export class WorkoutRepository implements CRUDRepository<WorkoutEntity, string, Workout>{
  constructor(
    @InjectModel(WorkoutModel.name) private readonly workoutModel: Model<WorkoutModel>
  ) {}

  async create(item: WorkoutEntity): Promise<Workout> {
    const newWorkout = new this.workoutModel(item);
    return newWorkout.save();
  }

  async find(id: string): Promise<Workout[] | []> {
    const workoutList = await this.workoutModel.find({coach: id});
    return workoutList;
  }

  async findById(id: string): Promise<Workout | null> {
    const existWorkout = await this.workoutModel.findOne({id});
    return existWorkout;
  }

  async update(id: string, item: UpdateWorkoutDto): Promise<Workout> {
    const updateWorkout = await this.workoutModel.findByIdAndUpdate(id, item, {new: true});
    return updateWorkout;
  }

  async destroy(id: string): Promise<void> {
   await this.workoutModel.findByIdAndDelete(id);
  }
}