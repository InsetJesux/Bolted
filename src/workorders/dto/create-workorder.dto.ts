import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Client } from 'src/clients/entities/client.entity';
import { Model } from 'src/models/entities/model.entity';

export class CreateWorkorderDto {
  @IsString()
  @IsNotEmpty()
  serial: string;

  @IsString()
  @IsNotEmpty()
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

  @Type(() => Client)
  @IsNotEmpty()
  client: Client;

  @Type(() => Model)
  @IsNotEmpty()
  model: Model;
}
