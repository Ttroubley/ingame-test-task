import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { AuthorEntity } from '../../authors/entity/author.entity';
import { GenreEntity } from '../../genres/entity/genre.entity';

@Entity('book')
export class BookEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text')
  name: string;

  @Column()
  year: number;

  @ManyToOne(() => GenreEntity, (genre) => genre.books)
  genre: GenreEntity;

  @ManyToMany(() => AuthorEntity)
  @JoinTable()
  authors: AuthorEntity[];

  @Column()
  publisher: string;
}
