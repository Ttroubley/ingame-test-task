import { IsNotEmpty } from 'class-validator';

export class AuthorDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  fullName: string;

  birthdate: string;
}
