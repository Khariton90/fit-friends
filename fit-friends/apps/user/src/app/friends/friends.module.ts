import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FriendsModel, FriendsSchema } from './friends.model';
import { FriendsRepository } from './friends.repository';
import { FriendsController } from './friends.controller';
import { UserModel, UserSchema } from '../fit-user/fit-user.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: FriendsModel.name,
        schema: FriendsSchema,
      },
      {
        name: UserModel.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [FriendsService, FriendsRepository],
  exports: [FriendsService, FriendsRepository],
  controllers: [FriendsController],
})
export class FriendsModule {}
