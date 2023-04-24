import { IsNotEmpty } from 'class-validator';
import { AuthorDto } from 'src/authors/dto/author.dto';
import { GenreDto } from 'src/genres/dto/genre.dto';

export class BookDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;

  year: number;

  genre: GenreDto;

  authors?: AuthorDto[];

  publisher?: string;

  bookFileId?: string;
}
