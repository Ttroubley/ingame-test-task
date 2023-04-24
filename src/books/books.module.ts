import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './entity/book.entity';
import { GenresModule } from 'src/genres/genres.module';
import { AuthorsModule } from 'src/authors/authors.module';

@Module({
  controllers: [BooksController],
  providers: [BooksService],
  imports: [
    TypeOrmModule.forFeature([BookEntity]),
    GenresModule,
    AuthorsModule,
  ],
  exports: [BooksService],
})
export class BooksModule {}
