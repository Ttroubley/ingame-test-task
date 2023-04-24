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
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'int', nullable: true })
  year?: number;

  @ManyToOne(() => GenreEntity, (genre) => genre.books)
  genre?: GenreEntity;

  @ManyToMany(() => AuthorEntity)
  @JoinTable()
  authors?: AuthorEntity[];

  @Column({ type: 'varchar', nullable: true })
  publisher?: string;

  @Column({ nullable: true })
  bookFileId?: string;
}
