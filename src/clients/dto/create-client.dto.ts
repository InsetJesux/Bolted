import { Type } from 'class-transformer';
import {
  IsIdentityCard,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { City } from 'src/cities/entities/city.entity';

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

  @IsString()
  @IsPhoneNumber()
  @IsOptional()
  phone?: string;

  @Type(() => City)
  @IsOptional()
  city?: City;
}
