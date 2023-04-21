import { IsNotEmpty } from 'class-validator';
import { AuthorEntity } from 'src/authors/entity/author.entity';

export class GenreDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  name: string;
}
