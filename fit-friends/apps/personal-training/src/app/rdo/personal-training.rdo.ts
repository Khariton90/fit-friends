import { PersonalTrainingStatus } from "@fit-friends/shared-types";
import { ApiProperty } from "@nestjs/swagger";
import { Expose, Transform } from "class-transformer";

export class PersonalTrainingRdo {
  @Transform(({obj}) => obj._id.toString())
  @Expose({name: '_id'})
  @ApiProperty({
    type: String,
    description: 'Uniq personal-training ID',
    example: '6428a0dc06396d71e8f37ee2'
  })
  id: string;

  @Expose()
  @ApiProperty({
    type: String,
    description: 'Uniq iniator ID',
    example: '6428a0dc06396d71e8f37ee2'
  })
  initiator: string;

  @Expose()
  @ApiProperty({
    type: String,
    description: 'Uniq user ID',
    example: '6428a0dc06396d71e8f37ee2'
  })
  user: string;

  @Expose()
  @ApiProperty({
    type: Date,
    description: 'Date of creation of personal training',
    example: '2023-04-01T21:23:40.529Z'
  })
  createdAt: Date;

  @Expose()
  @ApiProperty({
    type: String,
    enum: PersonalTrainingStatus,
    description: 'Personal training status',
    example: 'pending'
  })
  status: PersonalTrainingStatus

  @Expose({name: 'updatedAt'})
  @ApiProperty({
    type: Date,
    description: 'Date of change in training status',
    example: '2023-04-01T21:23:40.529Z'
  })
  changeStatus: Date;
}