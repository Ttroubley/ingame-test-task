import { Module } from '@nestjs/common';
import { GenresController } from './genres.controller';
import { GenresService } from './genres.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenreEntity } from './entity/genre.entity';

@Module({
  controllers: [GenresController],
  providers: [GenresService],
  imports: [TypeOrmModule.forFeature([GenreEntity])],
  exports: [GenresService],
})
export class GenresModule {}
