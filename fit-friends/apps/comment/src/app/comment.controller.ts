import { CreateCommentDto } from './dto/create-comment.dto';
import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AppService } from './comment.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CheckMongoidValidationPipe, fillObject } from '@fit-friends/core';
import { ExtendedUserRequest } from '@fit-friends/shared-types';
import { CommentRdo } from './rdo/comment.rdo';

@ApiTags('Comment')
@Controller('comment')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/:workoutId')
  async findAll(@Param('workoutId') workoutId: string) {
    const comments = await this.appService.findAll(workoutId);
    return fillObject(CommentRdo, comments);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:workoutId')
  async createComment(
    @Param('workoutId', CheckMongoidValidationPipe) workoutId: string, 
    @Body() dto: CreateCommentDto, @Req() req: ExtendedUserRequest) {
    const newComment = await this.appService.create(dto, req.user.sub, workoutId);
    return fillObject(CommentRdo, newComment);
  }
}
