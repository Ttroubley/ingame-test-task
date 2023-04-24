import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('author')
export class AuthorEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  fullName: string;

  @Column({ type: 'varchar' })
  birthdate: string;
}
