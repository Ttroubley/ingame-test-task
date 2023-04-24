import { DataSource } from 'typeorm';
import { AuthorEntity } from './authors/entity/author.entity';
import { BookEntity } from './books/entity/book.entity';
import { GenreEntity } from './genres/entity/genre.entity';
import { UserEntity } from './users/entity/user.entity';
import { BookFileEntity } from './book-storage/entity/book-file.entity';
import {
  SeedGenreRecords1682354142527,
  SeedUserAdminRecord1682354412513,
} from './utils/migrations/index';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'postgres',
  port: 5432,
  username: 'user',
  password: 'password',
  database: 'inGameTestDb',
  entities: [AuthorEntity, BookEntity, GenreEntity, UserEntity, BookFileEntity],
  synchronize: true,
  migrations: [SeedGenreRecords1682354142527, SeedUserAdminRecord1682354412513],
});
