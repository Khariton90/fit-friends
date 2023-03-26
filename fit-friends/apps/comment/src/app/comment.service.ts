import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentRepository } from './comment.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    private readonly commentRepository: CommentRepository,
  ) {}

  public async findAll(id: string) {
    const comments = await this.commentRepository.find(id);
    return comments;
  }

  public async create(item: CreateCommentDto) {
    const comment = await this.commentRepository.create(item);
    return comment;
  }
}
