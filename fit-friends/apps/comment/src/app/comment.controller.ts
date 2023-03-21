import { CreateCommentDto } from './dto/create-comment.dto';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './comment.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Comment')
@Controller('comment')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/:workoutId')
  async findAll(@Param('workoutId') workoutId: string) {
    const comments = await this.appService.findAll(workoutId);
    return comments;
  }

  @Post('/:id')
  async createComment(@Body() dto: CreateCommentDto, @Param('id') id: string) {
    const newComment = await this.appService.create(dto);
    return newComment;
  }
}
