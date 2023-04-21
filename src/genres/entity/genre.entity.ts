import { BookEntity } from 'src/books/entity/book.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('genre')
export class GenreEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @OneToMany(() => BookEntity, (book) => book.genre)
  books: BookEntity[];
}
