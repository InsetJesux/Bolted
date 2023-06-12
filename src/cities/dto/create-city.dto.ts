import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { Province } from 'src/provinces/entities/province.entity';

export class CreateCityDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @Type(() => Province)
  @IsNotEmpty()
  province: Province;
}
