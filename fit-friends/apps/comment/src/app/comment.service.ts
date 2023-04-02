import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentRepository } from './comment.repository';
import { Injectable } from '@nestjs/common';
import { CommentEntity } from './comment.entity';
import { Comment } from '@fit-friends/shared-types';

@Injectable()
export class AppService {
  constructor(
    private readonly commentRepository: CommentRepository,
  ) {}

  public async findAll(id: string): Promise<Comment[] | []> {
    const comments = await this.commentRepository.find(id);
    return comments;
  }

  public async create(item: CreateCommentDto, author: string, workout: string) {
    const comment = {
      author,
      workout,
      rating: item.rating,
      review: item.review,
    }
    const commentEntity = new CommentEntity(comment);
    return await this.commentRepository.create(commentEntity);
  }
}
