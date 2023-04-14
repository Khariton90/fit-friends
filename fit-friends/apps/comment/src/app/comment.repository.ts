import { CreateCommentDto } from './dto/create-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentModel } from './comment.model';
import { CommentQuery } from './query/comment.query';
import { DEFAULT_QUERY_LIMIT } from '@fit-friends/core';

export class CommentRepository {
  constructor(
    @InjectModel(CommentModel.name) private readonly commentModel: Model<CommentModel>
  ) { }

  public async find(id: string, query: CommentQuery) {
    const pageOptions = {
      page: query.skip > 1 ? query.skip - 1 : 0,
      date: query.date || -1,
      query: query.limit ? query.limit : DEFAULT_QUERY_LIMIT
    }

    const commentList = await this.commentModel
      .find({ workout: id })
      .sort([
        ['date', pageOptions.date]])
      .limit(pageOptions.query)
      .skip(pageOptions.page * pageOptions.query)
      .exec();

    return commentList;
  }

  public async create(item: CreateCommentDto) {
    const newComment = new this.commentModel(item);
    return newComment.save();
  }
}