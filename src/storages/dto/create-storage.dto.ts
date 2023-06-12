import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateStorageDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}
