import { Comment } from "@fit-friends/shared-types";

export class CommentEntity implements Comment {
  public _id?: string;
  public author: string;
  public workout: string;
  public rating: number;
  public review: string;
  
  constructor(comment: Comment) {
    this.fillEntity(comment);
  }

  public fillEntity(comment: Comment) {
    this.author = comment.author;
    this.workout = this.workout = comment.workout;
    this.rating = comment.rating;
    this.review = comment.review;
  }

  public toObject() {
    return {...this};
  }
}