import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateWorkorderDto {
  @IsString()
  @MinLength(1)
  serial: string;

  @IsString()
  @MinLength(1)
  symptoms: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  purchaseDate?: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  warrantyDate?: string;

  @IsBoolean()
  @IsOptional()
  isWarranty?: boolean;
}
