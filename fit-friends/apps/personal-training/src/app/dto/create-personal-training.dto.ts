import { PersonalTrainingStatus } from "@fit-friends/shared-types";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePersonalTrainingDto {
  @ApiProperty({
    description: 'Employed user in the system with the role of "user"',
    required: true,
    example: '642858ae021f7d1433c22c74'
  })
  initiator: string;

  @ApiProperty({
    description: 'A part of an existing user in the system with the role of "user" or "coach". The user who is the initiator of the training cannot be chosen.',
    required: true,
    example: '642858ae021f7d1433c22c72'
  })
  user: string;

  @ApiProperty({
    description: 'The current application status',
    required: true,
    example: 'pending'
  })
  status: PersonalTrainingStatus;
}