import { Allow, IsEmail, IsNumber, IsString } from 'class-validator';

export class JWTPayloadDto {
  @IsNumber()
  id: number;

  @IsEmail()
  email: string;

  @Allow()
  iat?: number;

  @Allow()
  exp?: number;
}
