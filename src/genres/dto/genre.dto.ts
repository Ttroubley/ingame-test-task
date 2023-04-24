import { IsNotEmpty } from 'class-validator';
import { BookDto } from 'src/books/dto/book.dto';

export class GenreDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;

  books?: BookDto[];
}
