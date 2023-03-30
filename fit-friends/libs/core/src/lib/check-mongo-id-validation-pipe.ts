import { Injectable } from '@nestjs/common';
import { PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { Types } from "mongoose";

@Injectable()
export class CheckMongoidValidationPipe implements PipeTransform {
  transform(value: string, { type }: ArgumentMetadata) {
    if (type !== 'param') {
      throw new BadRequestException('This pipe must user only with params')
    }

    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException('Invalid Mongo Id');
    }

    return value;
  }
}