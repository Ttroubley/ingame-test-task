import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookFileService } from './book-file.service';
import { BookFileEntity } from './entity/book-file.entity';
import { BooksModule } from 'src/books/books.module';
import { BookFileController } from './book-file.controller';

@Module({
  providers: [BookFileService],
  imports: [BooksModule, TypeOrmModule.forFeature([BookFileEntity])],
  controllers: [BookFileController],
})
export class BookFileModule {}
