import { Module } from '@nestjs/common';
import { FavoritesGymService } from './favorites-gym.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FavoritesGymModel, FavoritesGymSchema } from './favorites-gym.model';
import { FavoritesGymRepository } from './favorites-gym.repository';
import { FavoritesGymController } from './favorites-gym.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: FavoritesGymModel.name,
        schema: FavoritesGymSchema,
      },
    ]),
  ],
  providers: [FavoritesGymService, FavoritesGymRepository],
  exports: [FavoritesGymService, FavoritesGymRepository],
  controllers: [FavoritesGymController],
})
export class FavoritesGymModule {}
