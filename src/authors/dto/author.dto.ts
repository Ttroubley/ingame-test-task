import { IsNotEmpty } from 'class-validator';

export class AuthorDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  fullName: string;

  birthdate: string;
}
