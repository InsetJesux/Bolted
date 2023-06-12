import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { Brand } from 'src/brands/entities/brand.entity';

export class CreateModelDto {
  @IsString()
  name: string;

  @Type(() => Brand)
  @IsNotEmpty()
  brand: Brand;
}
