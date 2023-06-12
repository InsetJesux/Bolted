import {
  IsIdentityCard,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateClientDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsString()
  @IsIdentityCard('ES')
  @IsOptional()
  nif?: string;

  @IsString()
  @MinLength(5)
  @IsOptional()
  address?: string;

  @IsPhoneNumber()
  phone?: string;
}
