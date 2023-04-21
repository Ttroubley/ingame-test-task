import { IsNotEmpty } from 'class-validator';

export class CreateAuthorDto {
  @IsNotEmpty()
  fullName: string;
  @IsNotEmpty()
  birthdate: string;
}
