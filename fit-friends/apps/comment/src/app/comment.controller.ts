import { CreateCommentDto } from './dto/create-comment.dto';
import { Body, Controller, Get, HttpStatus, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AppService } from './comment.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CheckMongoidValidationPipe, fillObject } from '@fit-friends/core';
import { ExtendedUserRequest } from '@fit-friends/shared-types';
import { CommentRdo } from './rdo/comment.rdo';
import { CommentQuery } from './query/comment.query';

@ApiTags('Comment')
@Controller('comment')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/:workoutId')
  @ApiResponse({
    status: HttpStatus.OK,
    type: [CommentRdo],
    description: 'Received a list of comments on ID training',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Comments are not found'
  })
  async findAll(@Param('workoutId') workoutId: string, @Query() query: CommentQuery) {
    const comments = await this.appService.findAll(workoutId, query);
    return fillObject(CommentRdo, comments);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:workoutId')
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: CommentRdo,
    description: 'A new comment has been created',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'The user is not authorized',
  })
  async createComment(
    @Param('workoutId', CheckMongoidValidationPipe) workoutId: string, 
    @Body() dto: CreateCommentDto, @Req() req: ExtendedUserRequest) {
    const newComment = await this.appService.create(dto, req.user.sub, workoutId);
    return fillObject(CommentRdo, newComment);
  }
}
