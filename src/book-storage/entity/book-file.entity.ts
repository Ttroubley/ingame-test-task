import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('bookfile')
export class BookFileEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  filename: string;

  @Column({ type: 'varchar' })
  path: string;
}
