import { CreateCommentDto } from './dto/create-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentModel } from './comment.model';
import { CommentQuery } from './query/comment.query';

const DEFAULT_LIMIT_COMMENTS = 50;

export class CommentRepository {
  constructor(
    @InjectModel(CommentModel.name) private readonly commentModel: Model<CommentModel>
  ) { }

  public async find(id: string, query: CommentQuery) {
    const pageOptions = {
      page: query.skip > 1 ? query.skip - 1 : 0,
      date: query.date || -1,
    }

    const commentList = await this.commentModel
      .find({ author: id })
      .sort([
        ['date', pageOptions.date]])
      .limit(DEFAULT_LIMIT_COMMENTS)
      .skip(pageOptions.page * DEFAULT_LIMIT_COMMENTS)
      .exec();

    return commentList;
  }

  public async create(item: CreateCommentDto) {
    const newComment = new this.commentModel(item);
    return newComment.save();
  }
}