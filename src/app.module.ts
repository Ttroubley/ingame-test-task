import { DynamicModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorsModule } from './authors/authors.module';
import { GenresModule } from './genres/genres.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorEntity } from './authors/entity/author.entity';
import { BookEntity } from './books/entity/book.entity';
import { GenreEntity } from './genres/entity/genre.entity';
import { BooksModule } from './books/books.module';
import { UsersModule } from './users/users.module';
import { UserEntity } from './users/entity/user.entity';
import { AuthModule } from './auth/auth.module';
import { BookFileEntity } from './book-storage/entity/book-file.entity';
import { BookFileModule } from './book-storage/book-file.module';
import { DataSource } from 'typeorm';

@Module({})
export class AppModule {
  static forRoot(dataSource: DataSource): DynamicModule {
    return {
      module: AppModule,
      imports: [
        BooksModule,
        AuthorsModule,
        GenresModule,
        UsersModule,
        AuthModule,
        BookFileModule,
        TypeOrmModule.forRootAsync({
          useFactory: async () => {
            await dataSource.initialize();
            return dataSource.options;
          },
        }),
      ],
      controllers: [AppController],
      providers: [AppService],
    };
  }
}
