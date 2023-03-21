import { CreateCommentDto } from './dto/create-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentModel } from './comment.model';


export class CommentRepository {
  constructor(
    @InjectModel(CommentModel.name) private readonly commentModel: Model<CommentModel>
  ) {}

  public async find(id: string) {
    return await this.commentModel.find({author: id}).exec();
  }

  public async create(item: CreateCommentDto) {
    const newComment = new this.commentModel(item);
    return newComment.save();
  }
}